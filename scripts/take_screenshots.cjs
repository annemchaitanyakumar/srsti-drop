const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

console.log('Capturing Hero 1...');
console.log('Capturing restored original hero...');
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=3000 --window-size=1400,900 --screenshot="${path.join(artDir, 'restored_original_hero.png')}" http://127.0.0.1:3000/`, { stdio: 'inherit' });
console.log('Screenshot captured!');


