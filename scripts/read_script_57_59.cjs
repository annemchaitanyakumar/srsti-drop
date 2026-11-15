const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let idx = 0;
while ((m = scriptRegex.exec(html)) !== null) {
  if (idx === 57 || idx === 59) {
    console.log(`\n================ SCRIPT #${idx} ================`);
    console.log(m[2]);
  }
  idx++;
}
