const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

console.log('Capturing verified hero screenshot...');
try {
  execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${path.join(artDir, 'final_verified_hero.png')}" http://127.0.0.1:3000/`, { stdio: 'inherit' });
  console.log('Screenshot captured successfully!');
} catch (e) {
  console.error('Capture error:', e.message);
}
