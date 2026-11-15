const fs = require('fs');
const html = fs.readFileSync('pages_source/about_us_real.html', 'utf8');

const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
if (mainMatch) {
  const main = mainMatch[0];
  console.log('Main length:', main.length);
  const elements = main.match(/<(div|section)[^>]+id=["'][^"']+["'][^>]*>/gi) || [];
  console.log('Main ID elements:');
  elements.forEach(e => console.log('  ', e.substring(0, 100)));
}
