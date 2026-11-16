const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';
const idx4 = html.indexOf(s4Start);
console.log('Section 4 preview:', html.substring(idx4, idx4 + 600));
