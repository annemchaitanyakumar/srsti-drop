const { execSync } = require('child_process');

const script = `
const out = {};
['srstiHeaderStack', 'srstiCenterStage', 'srstiBottlesRig', 'srstiBottleDrizzle', 'srstiBottleSizzle', 'srstiCenterCup', 'srstiCardDrizzle', 'srstiCardSizzle', 'srstiBottomHud'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    const r = el.getBoundingClientRect();
    out[id] = { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) };
  }
});
console.log('RECTS:' + JSON.stringify(out));
`;

// Let's inject this into hero_test.html and run chrome with --virtual-time-budget
const fs = require('fs');
let html = fs.readFileSync('hero_test.html', 'utf8');
html = html.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('hero_test_rects.html', html);

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
try {
  const res = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 --run-all-compositor-stages-before-draw http://127.0.0.1:3000/hero_test_rects.html --enable-logging=stderr 2>&1`, { encoding: 'utf8' });
  const lines = res.split('\n');
  const rectLine = lines.find(l => l.includes('RECTS:'));
  if (rectLine) {
    console.log(rectLine);
  } else {
    console.log('Output preview:', res.substring(0, 500));
  }
} catch (e) {
  console.log('Exec output:', e.stdout || e.message);
}
