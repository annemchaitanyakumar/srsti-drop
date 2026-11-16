const { execSync } = require('child_process');

const script = `
const y = window.scrollY;
const hero = document.getElementById('srstiHeroTrack');
const heroRect = hero ? hero.getBoundingClientRect() : null;
const s4 = document.getElementById('shopify-section-template--16889120686294__announcement_bar_pTYkYK');
const s4Rect = s4 ? s4.getBoundingClientRect() : null;
const s6 = document.getElementById('shopify-section-template--16889120686294__about_srsti_xbM84F');
const s6Rect = s6 ? s6.getBoundingClientRect() : null;

console.log('SCROLL_INFO:' + JSON.stringify({
  scrollY: y,
  heroRect: heroRect ? { top: heroRect.top, bottom: heroRect.bottom, height: heroRect.height } : null,
  s4Rect: s4Rect ? { top: s4Rect.top, bottom: s4Rect.bottom, height: s4Rect.height } : null,
  s6Rect: s6Rect ? { top: s6Rect.top, bottom: s6Rect.bottom, height: s6Rect.height } : null
}));
`;

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('temp_scroll_check.html', html);

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
[600, 1200, 2000].forEach(s => {
  try {
    const res = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 http://127.0.0.1:3000/temp_scroll_check.html?scroll=${s} --enable-logging=stderr 2>&1`, { encoding: 'utf8' });
    const line = res.split('\n').find(l => l.includes('SCROLL_INFO:'));
    console.log(`Scroll ${s}:`, line ? line.trim() : 'No line');
  } catch (e) {
    console.log(`Error at ${s}:`, e.message);
  }
});
