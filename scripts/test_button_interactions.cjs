const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

// Let's create a test that clicks the Drizzle and Sizzle buttons and takes screenshots
const script = `
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clickTarget = urlParams.get('click');
  if (clickTarget) {
    setTimeout(() => {
      const btn = document.querySelector('.srsti-switch-btn[data-view=\"' + clickTarget + '\"]');
      if (btn) {
        btn.click();
        console.log('Clicked view:', clickTarget);
      }
    }, 400);
  }
});
`;

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('temp_click_test.html', html);

['drizzle', 'sizzle'].forEach(view => {
  const outPath = path.join(artDir, `view_${view}_active.png`);
  console.log(`Testing click view: ${view}...`);
  try {
    execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --screenshot="${outPath}" "http://127.0.0.1:3000/temp_click_test.html?click=${view}"`, { stdio: 'inherit' });
    console.log(`Saved view_${view}_active.png (${fs.statSync(outPath).size} bytes)`);
  } catch (e) {
    console.error(e.message);
  }
});
