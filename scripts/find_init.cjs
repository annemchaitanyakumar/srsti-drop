const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

// Find all script tags without src
const inlineScripts = html.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Inline scripts count:', inlineScripts.length);

inlineScripts.forEach((s, idx) => {
  if (s.includes('window.') || s.includes('Vue') || s.includes('bundle') || s.includes('init') || s.includes('theme')) {
    console.log(`\n--- SCRIPT #${idx} (length ${s.length}) ---`);
    console.log(s.substring(0, 300));
  }
});
