const fs = require('fs');
const list = ['garnish.png', 'bake.png', 'driz_srsti.jpg', 'sizzle_srsti.jpg', 'drizzle_bottle.png', 'sizzle_bottle.png'];
let html = '<!DOCTYPE html><html><body style="background:#FAF8F5;display:flex;flex-wrap:wrap;gap:20px;padding:30px;">';
list.forEach(f => {
  html += `<div style="text-align:center;background:white;padding:10px;border-radius:10px;max-width:300px;">
    <h4>${f}</h4>
    <img src="/assets/images/${f}" style="max-width:100%;max-height:220px;object-fit:contain;"/>
  </div>`;
});
html += '</body></html>';
fs.writeFileSync('preview_culinary.html', html);

const { execSync } = require('child_process');
const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1200,800 --screenshot="${artDir}\\culinary_preview.png" http://127.0.0.1:3000/preview_culinary.html`, { stdio: 'inherit' });
console.log('Saved culinary_preview.png');
