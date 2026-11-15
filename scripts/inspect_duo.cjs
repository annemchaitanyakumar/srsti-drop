const fs = require('fs');

const html = fs.readFileSync('pages_source/the-duo.html', 'utf8');

const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
if (mainMatch) {
  const main = mainMatch[0];
  console.log('the-duo.html main length:', main.length);
  const elements = main.match(/<(div|section)[^>]+id=["'][^"']+["'][^>]*>/gi) || [];
  elements.forEach(e => console.log('  ', e.substring(0, 100)));
}
