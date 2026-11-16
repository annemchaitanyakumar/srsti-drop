const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

const tests = [
  { name: 'index_homepage_top', url: 'http://127.0.0.1:3000/' },
  { name: 'index_homepage_p35', url: 'http://127.0.0.1:3000/?p=0.35' },
  { name: 'index_homepage_p70', url: 'http://127.0.0.1:3000/?p=0.70' },
  { name: 'index_homepage_p100', url: 'http://127.0.0.1:3000/?p=1.0' },
];

tests.forEach(t => {
  const outPath = path.join(artDir, `${t.name}.png`);
  console.log(`Capturing ${t.name}...`);
  try {
    const res = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2500 --window-size=1440,900 --screenshot="${outPath}" "${t.url}" --enable-logging=stderr 2>&1`, { encoding: 'utf8' });
    console.log(`Saved ${t.name} (${fs.statSync(outPath).size} bytes)`);
  } catch (e) {
    console.error(e.message);
  }
});
