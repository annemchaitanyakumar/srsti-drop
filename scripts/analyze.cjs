const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');
console.log('HTML length:', html.length);

// Extract title
const titleMatch = html.match(/<title>(.*?)<\/title>/i);
console.log('Title:', titleMatch ? titleMatch[1] : 'None');

// Extract stylesheets
const cssMatches = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
console.log('\n--- STYLESHEETS (' + cssMatches.length + ') ---');
cssMatches.forEach(m => console.log(m));

// Extract all css hrefs
const hrefMatches = html.match(/href=["'](https?:\/\/[^"']+\.css[^"']*)["']/gi) || [];
console.log('\n--- CSS LINKS ---');
[...new Set(hrefMatches)].forEach(h => console.log(h));

// Extract scripts
const scriptMatches = html.match(/src=["'](https?:\/\/[^"']+\.js[^"']*)["']/gi) || [];
console.log('\n--- JS SCRIPTS (' + scriptMatches.length + ') ---');
[...new Set(scriptMatches)].slice(0, 20).forEach(s => console.log(s));

// Extract fonts
const fontMatches = html.match(/https?:\/\/[^"'()\s]+\.(woff2?|ttf|otf)[^"'()\s]*/gi) || [];
console.log('\n--- FONTS (' + fontMatches.length + ') ---');
[...new Set(fontMatches)].forEach(f => console.log(f));

// Check main sections / containers
console.log('\n--- SECTION IDs / CLASSES ---');
const sections = html.match(/<(section|main|header|footer)[^>]*>/gi) || [];
sections.slice(0, 30).forEach(s => console.log(s));
