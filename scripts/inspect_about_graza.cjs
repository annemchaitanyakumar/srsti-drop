const fs = require('fs');

const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const idx = bundle.indexOf('name:"AboutGraza"');
console.log('Snippet before AboutGraza (render function):');
console.log(bundle.substring(idx - 2500, idx));

console.log('\nSnippet after AboutGraza:');
console.log(bundle.substring(idx, idx + 1500));
