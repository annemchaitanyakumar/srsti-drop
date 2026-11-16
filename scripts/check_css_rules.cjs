const fs = require('fs');
const css = fs.readFileSync('assets/bundle.css', 'utf8');

function findRule(sel) {
  const idx = css.indexOf(sel);
  if (idx !== -1) {
    console.log(sel, ':', css.substring(idx, idx + 250));
  } else {
    console.log(sel, 'not found');
  }
}

findRule('.btn--std');
findRule('.text-highlight');
findRule('.h-screen-static');
