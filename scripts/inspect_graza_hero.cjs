const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const matches = html.match(/<section[^>]*hero[^>]*>[\s\S]*?<\/section>/gi) || html.match(/id="[^"]*hero[^"]*"[^>]*>/gi);
console.log('Matches in graza_home.html:', matches ? matches.slice(0, 3) : 'None');

const hIdx = html.indexOf('hero');
console.log('hero idx:', hIdx);
if (hIdx !== -1) {
  console.log(html.substring(hIdx - 50, hIdx + 500));
}
