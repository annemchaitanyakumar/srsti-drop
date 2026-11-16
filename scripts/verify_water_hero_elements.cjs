const { execSync } = require('child_process');
const fs = require('fs');

const script = `
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const c = document.getElementById('water');
    const gl = c ? c.getContext('webgl') : null;
    const title = document.querySelector('.water-hero-title');
    const btn = document.querySelector('.water-hero-btn');
    const scrollInd = document.querySelector('.water-scroll-indicator');
    const header = document.getElementById('header');

    console.log('WATER_HERO_DIAG:' + JSON.stringify({
      canvas: c ? { w: c.width, h: c.height, cw: c.clientWidth, ch: c.clientHeight, hasGL: !!gl } : null,
      title: title ? { text: title.textContent.trim(), rect: title.getBoundingClientRect() } : null,
      btn: btn ? { text: btn.textContent.trim(), rect: btn.getBoundingClientRect() } : null,
      scrollInd: scrollInd ? { text: scrollInd.textContent.trim(), rect: scrollInd.getBoundingClientRect() } : null,
      header: header ? { rect: header.getBoundingClientRect(), color: window.getComputedStyle(header).color } : null
    }));
  }, 400);
});
`;

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('temp_water_diag.html', html);

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
try {
  const res = execSync(`${chrome} --headless=new --no-sandbox --window-size=1440,900 http://127.0.0.1:3000/temp_water_diag.html --enable-logging=stderr 2>&1`, { timeout: 8000, encoding: 'utf8' });
  const line = res.split('\n').find(l => l.includes('WATER_HERO_DIAG:'));
  console.log(line ? line.trim() : res.substring(0, 400));
} catch (e) {
  console.error(e.message);
}
