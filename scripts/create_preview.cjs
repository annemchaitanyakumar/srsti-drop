const fs = require('fs');
const list = ['drizzle_bottle.png', 'sizzle_bottle.png', 'bottle_1.png', 'bottle_2.png', 'bottle_3.png', 'real_3d_cup.png', 'duo-cans.png'];
let html = '<!DOCTYPE html><html><head><title>Asset Preview</title></head><body style="background:#FAF8F5;display:flex;flex-wrap:wrap;gap:20px;padding:40px;font-family:sans-serif;">';
list.forEach(f => {
  html += `<div style="text-align:center;background:white;padding:15px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
    <h4 style="margin:0 0 10px 0;font-size:13px;color:#333;">${f}</h4>
    <img src="/assets/images/${f}" style="max-height:260px;object-fit:contain;background:repeating-conic-gradient(#f0f0f0 0% 25%, white 0% 50%) 50% / 16px 16px;border-radius:8px;"/>
  </div>`;
});
html += '</body></html>';
fs.writeFileSync('test_assets_preview.html', html);
console.log('Written test_assets_preview.html');
