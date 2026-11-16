const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';
const outPath = path.join(artDir, 'water_hero_homepage_fast.png');

console.log('Capturing with default headless timing...');
try {
  execSync(`${chrome} --headless=new --no-sandbox --window-size=1440,900 --screenshot="${outPath}" "http://127.0.0.1:3000/"`, { timeout: 8000, stdio: 'inherit' });
  console.log('Captured fast:', fs.statSync(outPath).size, 'bytes');
} catch (e) {
  console.log('Error:', e.message);
}
