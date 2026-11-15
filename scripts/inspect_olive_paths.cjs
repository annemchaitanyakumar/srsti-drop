const fs = require('fs');

const html = fs.readFileSync('scripts/sections/7_shopify-section-template--16889120686294__about_graza_xbM84F.html', 'utf8');

// Find all path elements in slot:olive
const paths = html.match(/<path[^>]*>/gi) || [];
console.log('Path tags count in slot:olive:', paths.length);
paths.forEach((p, i) => console.log(`Path ${i}:`, p.substring(0, 100)));
