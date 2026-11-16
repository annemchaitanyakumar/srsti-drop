const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

const html = `
<!DOCTYPE html>
<html>
<head>
<title>Extracting</title>
</head>
<body>
<canvas id="cCup"></canvas>
<canvas id="cMoss"></canvas>
<textarea id="cupData"></textarea>
<textarea id="mossData"></textarea>
<script>
  const img = new Image();
  img.src = '/assets/native_frame_0.png';
  img.onload = () => {
    function makeTransparent(ctx, w, h, threshold = 250) {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i+1], b = d[i+2];
        if (r >= threshold && g >= threshold && b >= threshold) {
          d[i+3] = 0;
        } else if (r >= 238 && g >= 238 && b >= 238) {
          const diff = Math.min(255 - r, 255 - g, 255 - b);
          d[i+3] = Math.min(255, diff * 15);
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // 1. EXTRACT 3D CUP + LEAVES + DROPLETS
    const cCup = document.getElementById('cCup');
    const ctxCup = cCup.getContext('2d');
    const cupW = 820;
    const cupH = 410;
    cCup.width = cupW;
    cCup.height = cupH;
    ctxCup.drawImage(img, 480, 430, cupW, cupH, 0, 0, cupW, cupH);
    makeTransparent(ctxCup, cupW, cupH, 250);

    const cupData = cCup.toDataURL('image/png').replace(/^data:image\\/png;base64,/, '');
    document.getElementById('cupData').textContent = cupData;

    // 2. EXTRACT MOSS HILL
    const cMoss = document.getElementById('cMoss');
    const ctxMoss = cMoss.getContext('2d');
    const mossW = 1730;
    const mossH = 210;
    cMoss.width = mossW;
    cMoss.height = mossH;
    ctxMoss.drawImage(img, 0, 870, mossW, mossH, 0, 0, mossW, mossH);
    ctxMoss.clearRect(950, 0, 90, 20);
    makeTransparent(ctxMoss, mossW, mossH, 250);

    const mossData = cMoss.toDataURL('image/png').replace(/^data:image\\/png;base64,/, '');
    document.getElementById('mossData').textContent = mossData;

    document.title = 'EXTRACTION_COMPLETE';
  };
</script>
</body>
</html>
`;

fs.writeFileSync('extract_runner.html', html, 'utf8');

console.log('Running Chrome to extract assets...');
const dom = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=3000 --dump-dom http://127.0.0.1:3000/extract_runner.html`, { maxBuffer: 50 * 1024 * 1024 }).toString();

const cupMatch = dom.match(/<textarea id="cupData">([^<]+)<\/textarea>/);
const mossMatch = dom.match(/<textarea id="mossData">([^<]+)<\/textarea>/);

if (cupMatch && cupMatch[1]) {
  fs.writeFileSync('assets/images/real_3d_cup.png', Buffer.from(cupMatch[1], 'base64'));
  console.log('Saved assets/images/real_3d_cup.png (' + fs.statSync('assets/images/real_3d_cup.png').size + ' bytes)');
} else {
  console.error('Failed to extract cupData');
}

if (mossMatch && mossMatch[1]) {
  fs.writeFileSync('assets/images/real_moss_hill.png', Buffer.from(mossMatch[1], 'base64'));
  console.log('Saved assets/images/real_moss_hill.png (' + fs.statSync('assets/images/real_moss_hill.png').size + ' bytes)');
} else {
  console.error('Failed to extract mossData');
}
