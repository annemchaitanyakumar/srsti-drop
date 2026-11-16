const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

for (let t = 0; t <= 5; t += 1.0) {
  console.log(`Extracting t=${t}`);
  execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1280,720 --screenshot="${path.join(artDir, `frame_${t}.png`)}" http://127.0.0.1:3000/inspect_video.html?t=${t}`, { stdio: 'inherit' });
}
console.log('All frames extracted!');
