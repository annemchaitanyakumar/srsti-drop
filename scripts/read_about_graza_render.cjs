const fs = require('fs');

const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const idx = bundle.indexOf('name:"AboutGraza"');
// Look for render function around idx
const renderIdx = bundle.indexOf('["render",function', idx);
const endIdx = bundle.indexOf('var w=(0,n(3744).Z)(C', idx);
console.log('AboutGraza definition:');
console.log(bundle.substring(idx, renderIdx + 1500));
