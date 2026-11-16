const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

// HTML to render video at native 1730x1080
const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1730px; height: 1080px; overflow: hidden; background: #fff; }
  video { width: 1730px; height: 1080px; object-fit: fill; }
</style>
</head>
<body>
  <video id="v" src="/assets/dribbble_ref.mp4" muted autoplay></video>
  <script>
    const v = document.getElementById('v');
    v.addEventListener('loadeddata', () => {
      v.currentTime = 0.001; // absolute start
      v.pause();
      setTimeout(() => { document.title = 'READY_FRAME'; }, 200);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('native_frame.html', html, 'utf8');

console.log('Capturing native 1730x1080 video frame...');
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1730,1080 --screenshot="${path.join(artDir, 'native_frame_0.png')}" http://127.0.0.1:3000/native_frame.html`, { stdio: 'inherit' });
console.log('Native frame captured!');
