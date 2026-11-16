const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: #000; display: flex; flex-direction: column; align-items: center; }
  video { width: 100vw; height: 100vh; object-fit: contain; }
</style>
</head>
<body>
  <video id="v" src="/assets/dribbble_ref.mp4" muted autoplay></video>
  <script>
    const v = document.getElementById('v');
    const params = new URLSearchParams(window.location.search);
    const t = parseFloat(params.get('t') || '1.0');
    v.addEventListener('loadeddata', () => {
      v.currentTime = t;
      v.pause();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('inspect_video.html', html, 'utf8');

for (const t of [0.5, 1.5, 2.5, 4.0]) {
  console.log('Capturing video frame at t=' + t);
  execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=3000 --window-size=1280,720 --screenshot="${path.join(artDir, 'video_frame_' + t + '.png')}" http://127.0.0.1:3000/inspect_video.html?t=${t}`, { stdio: 'inherit' });
}
console.log('Frames captured!');
