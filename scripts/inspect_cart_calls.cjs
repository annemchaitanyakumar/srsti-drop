const fs = require('fs');

const bundle = fs.readFileSync('bundle.js', 'utf8');

const cartCalls = bundle.match(/["']\/cart[^"']*["']/g) || [];
console.log('Cart endpoints in bundle.js:');
[...new Set(cartCalls)].forEach(c => console.log('  ', c));
