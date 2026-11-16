const fs = require('fs');
const { execSync } = require('child_process');

const script = `
const stage = document.getElementById('srstiHeroStage');
const r = stage ? stage.getBoundingClientRect() : null;
const visible = stage ? window.getComputedStyle(stage).display : 'no stage';
const opacity = stage ? window.getComputedStyle(stage).opacity : 'no stage';
console.log('STAGE_DIAG:' + JSON.stringify({ r, visible, opacity, bodyBg: window.getComputedStyle(document.body).backgroundColor }));
`;

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('temp_diag.html', html);

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
try {
  const res = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 http://127.0.0.1:3000/temp_diag.html?scroll=1200 --enable-logging=stderr 2>&1`, { encoding: 'utf8' });
  const line = res.split('\n').find(l => l.includes('STAGE_DIAG:'));
  console.log('Diag output:', line ? line.trim() : res.substring(0, 300));
} catch (e) {
  console.error(e.message);
}
