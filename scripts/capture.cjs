const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const url = process.argv[2] || 'http://127.0.0.1:3000/';
const filename = process.argv[3] || 'screenshot.png';
const scrollY = parseInt(process.argv[4] || '0', 10);

const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';
const outPath = path.join(artDir, filename);
const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

console.log(`Capturing ${url} (scrollY: ${scrollY}) -> ${outPath}`);
try {
  execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2500 --window-size=1440,900 --screenshot="${outPath}" "${url}"`, { stdio: 'inherit' });
  console.log('Capture success:', outPath, fs.statSync(outPath).size, 'bytes');
} catch (e) {
  console.error('Capture error:', e.message);
}
