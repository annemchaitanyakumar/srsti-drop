const fs = require('fs');

const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const idx = bundle.indexOf('function ie()');
if (idx !== -1) {
  console.log(bundle.substring(idx - 100, idx + 500));
} else {
  // search for "ie=" or "ie()"
  const idx2 = bundle.indexOf('ie=');
  console.log('ie= at:', idx2);
  console.log(bundle.substring(idx2 - 100, idx2 + 500));
}
