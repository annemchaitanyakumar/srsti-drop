const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';
const idx3 = html.indexOf(s3Start);
const idx4 = html.indexOf(s4Start);
console.log('s3Start idx:', idx3);
console.log('s4Start idx:', idx4);
console.log('Length between them:', idx4 - idx3);
