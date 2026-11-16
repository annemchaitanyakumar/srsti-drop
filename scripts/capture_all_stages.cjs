const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

const checks = [
  { name: 'hero_p0', p: '0' },
  { name: 'hero_p35', p: '0.35' },
  { name: 'hero_p70', p: '0.70' },
  { name: 'hero_p100', p: '1.0' },
];

checks.forEach(c => {
  const outPath = path.join(artDir, `${c.name}.png`);
  const url = `http://127.0.0.1:3000/hero_test.html?p=${c.p}`;
  console.log(`Capturing ${c.name} at p=${c.p}...`);
  try {
    execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outPath}" "${url}"`, { stdio: 'inherit' });
    console.log(`Saved ${c.name} (${fs.statSync(outPath).size} bytes)`);
  } catch (e) {
    console.error(e.message);
  }
});
