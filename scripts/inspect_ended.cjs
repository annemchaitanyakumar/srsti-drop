const fs = require('fs');
const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const idx = bundle.indexOf('name:"AboutGraza"');
const snippet = bundle.substring(idx - 300, idx + 1200);
console.log(snippet);
