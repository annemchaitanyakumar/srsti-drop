const fs = require('fs');

const bundle = fs.readFileSync('bundle.js', 'utf8');
const shopifyProps = bundle.match(/Shopify\.[a-zA-Z0-9_$]+/g) || [];
console.log('Shopify accesses in bundle.js:');
[...new Set(shopifyProps)].forEach(p => console.log('  ', p));
