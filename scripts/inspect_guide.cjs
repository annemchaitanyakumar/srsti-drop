const fs = require('fs');

const html = fs.readFileSync('pages_source/guide.html', 'utf8');

const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
if (mainMatch) {
  const main = mainMatch[0];
  console.log('guide.html main length:', main.length);
  const divs = main.match(/<(div|section)[^>]+id=["'][^"']+["'][^>]*>/gi) || [];
  divs.forEach(d => console.log('  ', d.substring(0, 100)));
}
