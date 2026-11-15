const fs = require('fs');

const css = fs.readFileSync('bundle.css', 'utf8');
const urls = css.match(/url\([^)]+\)/g) || [];
console.log('Total URLs in bundle.css:', urls.length);
console.log('Sample URLs:');
[...new Set(urls)].slice(0, 30).forEach(u => console.log('  ', u));
