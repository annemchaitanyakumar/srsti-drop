const fs = require('fs');

const bundle = fs.readFileSync('bundle.js', 'utf8');

const windowProps = bundle.match(/window\.[a-zA-Z0-9_$]+/g) || [];
console.log('Window properties in bundle.js:');
[...new Set(windowProps)].sort().forEach(p => console.log('  ', p));
