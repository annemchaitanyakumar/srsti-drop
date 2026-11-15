const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const start = html.indexOf('id="about-graza"');
console.log('Snippet inside about-graza in original graza_home.html:');
console.log(html.substring(start, start + 1200));
