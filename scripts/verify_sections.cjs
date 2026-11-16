const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /id="(shopify-section-[^"]+)"/g;
let match;
const sections = [];
while ((match = regex.exec(content)) !== null) {
  sections.push(match[1]);
}
console.log('Sections in index.html (' + sections.length + '):');
sections.forEach((s, i) => console.log(i + ':', s));
