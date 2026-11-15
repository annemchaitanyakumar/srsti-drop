const fs = require('fs');

const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const idx = bundle.indexOf('name:"AboutGraza"');
const snippet = bundle.substring(idx - 500, idx + 2000);

const endedMatches = [];
let i = 0;
while ((i = snippet.indexOf('ended', i)) !== -1) {
  endedMatches.push(snippet.substring(Math.max(0, i - 40), Math.min(snippet.length, i + 60)));
  i += 5;
}

console.log('ended occurrences in AboutGraza:');
endedMatches.forEach(m => console.log('  ', m));
