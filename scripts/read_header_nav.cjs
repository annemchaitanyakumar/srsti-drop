const fs = require('fs');

const header = fs.readFileSync('scripts/sections/0_header.html', 'utf8');

const navMatch = header.match(/:navigation='([^']+)'/);
if (navMatch) {
  const nav = JSON.parse(navMatch[1].replace(/&quot;/g, '"'));
  console.log('Desktop Nav:');
  console.log(JSON.stringify(nav, null, 2));
}
