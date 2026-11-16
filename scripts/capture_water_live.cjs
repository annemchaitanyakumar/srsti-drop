const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';
const outPath = path.join(artDir, 'water_hero_live.png');

console.log('Capturing water hero live on index.html...');
try {
  execSync(`${chrome} --headless=new --no-sandbox --window-size=1440,900 --virtual-time-budget=1500 --screenshot="${outPath}" "http://127.0.0.1:3000/"`, { stdio: 'inherit' });
  console.log('Success:', outPath, fs.statSync(outPath).size, 'bytes');
} catch (e) {
  console.error('Error:', e.message);
}
