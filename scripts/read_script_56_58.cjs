const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m, idx = 0;
while ((m = scriptRegex.exec(html)) !== null) {
  if (idx === 56 || idx === 58) {
    console.log(`\n================ SCRIPT #${idx} ================`);
    console.log(m[2]);
  }
  idx++;
}
