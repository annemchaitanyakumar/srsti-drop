const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

// HTML script to crop the 3D cup with transparent background from frame_0.png
const html = `
<!DOCTYPE html>
<html>
<body>
<canvas id="cCup"></canvas>
<canvas id="cMoss"></canvas>
<script>
  const img = new Image();
  img.src = '/inspect_frame0.png'; // we'll copy frame_0.png here
  img.onload = () => {
    // 1. Extract 3D Cup
    // In 1280x720: Cup is roughly cx=640, cy=460, width=500, height=350
    const cCup = document.getElementById('cCup');
    const ctxCup = cCup.getContext('2d');
    cCup.width = 560;
    cCup.height = 360;
    // draw the cup region
    ctxCup.drawImage(img, 360, 320, 560, 360, 0, 0, 560, 360);
    
    // Remove white background (make transparent)
    const imgData = ctxCup.getImageData(0, 0, 560, 360);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      // if pixel is nearly pure white
      if (r > 248 && g > 248 && b > 248) {
        d[i+3] = 0; // transparent
      } else if (r > 235 && g > 235 && b > 235) {
        // smooth anti-alias edge
        const diff = Math.min(255 - r, 255 - g, 255 - b);
        d[i+3] = Math.min(255, diff * 12);
      }
    }
    ctxCup.putImageData(imgData, 0, 0);

    // 2. Extract Moss Hill
    const cMoss = document.getElementById('cMoss');
    const ctxMoss = cMoss.getContext('2d');
    cMoss.width = 1280;
    cMoss.height = 180;
    ctxMoss.drawImage(img, 0, 540, 1280, 180, 0, 0, 1280, 180);

    document.title = 'READY';
  };
</script>
</body>
</html>
`;

// Copy frame_0.png to workspace for serving
fs.copyFileSync(path.join(artDir, 'frame_0.png'), 'inspect_frame0.png');
fs.writeFileSync('extract.html', html, 'utf8');

execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1280,720 --screenshot="${path.join(artDir, 'extracted_elements.png')}" http://127.0.0.1:3000/extract.html`, { stdio: 'inherit' });
console.log('Extraction run completed!');
