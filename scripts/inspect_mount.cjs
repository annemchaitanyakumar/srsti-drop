const fs = require('fs');
const bundle = fs.readFileSync('bundle.js', 'utf8');

const idx = bundle.indexOf('querySelectorAll("[vue]")');
if (idx !== -1) {
  console.log('Mount context around querySelectorAll("[vue]"):');
  console.log(bundle.substring(idx - 200, idx + 400));
} else {
  console.log('not found directly');
}
