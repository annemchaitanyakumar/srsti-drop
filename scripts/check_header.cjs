const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const headerIdx = content.indexOf('id="shopify-section-header"');
console.log(content.substring(headerIdx, headerIdx + 1200));
