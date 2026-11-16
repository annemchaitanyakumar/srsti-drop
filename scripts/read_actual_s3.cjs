const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const s3Idx = html.indexOf(s3Start);
const s4Idx = html.indexOf(s4Start);

console.log('Section 3 in actual index.html on disk:');
console.log(html.substring(s3Idx, s3Idx + 400));
