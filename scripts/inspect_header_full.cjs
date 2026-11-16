const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s0Start = '<div id="shopify-section-header"';
const idx0 = html.indexOf(s0Start);
console.log(html.substring(idx0, idx0 + 800));
