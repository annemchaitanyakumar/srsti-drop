const fs = require('fs');

const html = fs.readFileSync('pages_source/potato-chips.html', 'utf8');

const match = html.match(/<scroll-trigger[^>]*>[\s\S]*?<\/scroll-trigger>/gi);
console.log('Scroll trigger matches in potato-chips.html:', match ? match.length : 0);
if (match) {
  match.forEach((m, i) => console.log(`Match ${i}:\n`, m.substring(0, 500)));
}
