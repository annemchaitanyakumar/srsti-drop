const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

const scrollTests = [
  { name: 'scroll_0px', scroll: 0 },
  { name: 'scroll_600px', scroll: 600 },
  { name: 'scroll_1200px', scroll: 1200 },
  { name: 'scroll_2000px', scroll: 2000 }
];

scrollTests.forEach(t => {
  const outPath = path.join(artDir, `${t.name}.png`);
  const url = `http://127.0.0.1:3000/?scroll=${t.scroll}`;
  console.log(`Capturing ${t.name} (scroll=${t.scroll})...`);
  try {
    execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outPath}" "${url}"`, { stdio: 'inherit' });
    console.log(`Saved ${t.name} (${fs.statSync(outPath).size} bytes)`);
  } catch (e) {
    console.error(e.message);
  }
});
