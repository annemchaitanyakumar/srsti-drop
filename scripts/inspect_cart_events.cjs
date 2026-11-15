const fs = require('fs');

const bundle = fs.readFileSync('bundle.js', 'utf8');

const cartEvents = bundle.match(/["']cart:[^"']*["']/g) || [];
console.log('Cart events:', [...new Set(cartEvents)]);

const dispatchMatches = bundle.match(/dispatchEvent\([^)]+\)/g) || [];
console.log('Dispatch events sample:');
[...new Set(dispatchMatches)].slice(0, 10).forEach(d => console.log('  ', d));
