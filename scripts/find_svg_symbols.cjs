const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const symbols = html.match(/<symbol[^>]*id=["'][^"']+["'][^>]*>/gi) || [];
console.log('Symbols count:', symbols.length);
symbols.forEach(s => console.log('Symbol:', s));

const svgContainers = html.match(/<svg[^>]*style=["'][^"']*display:\s*none[^"']*["'][^>]*>[\s\S]*?<\/svg>/gi) || [];
console.log('Hidden SVG sprite containers:', svgContainers.length);
svgContainers.forEach((c, i) => console.log(`Container ${i} length: ${c.length}`));
