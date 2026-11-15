const fs = require('fs');

const js = fs.readFileSync('js-index.static.js', 'utf8');
console.log('js-index.static.js length:', js.length);
console.log('Sample:', js.substring(0, 500));
