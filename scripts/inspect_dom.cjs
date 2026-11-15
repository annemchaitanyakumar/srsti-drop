const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

// Find all sections
const sectionMatches = html.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || [];
console.log('Total <section> tags found:', sectionMatches.length);

sectionMatches.forEach((s, i) => {
  const idMatch = s.match(/id=["']([^"']+)["']/i);
  const classMatch = s.match(/class=["']([^"']+)["']/i);
  console.log(`\nSection #${i+1}:`);
  console.log('  ID:', idMatch ? idMatch[1] : 'none');
  console.log('  Class:', classMatch ? classMatch[1] : 'none');
  console.log('  Length:', s.length);
  // first 200 chars
  console.log('  Snippet:', s.substring(0, 250).replace(/\s+/g, ' '));
});

// Also check <header> and <footer>
const header = html.match(/<header[^>]*>[\s\S]*?<\/header>/gi);
console.log('\nHeader count:', header ? header.length : 0);
if (header) {
  console.log('Header snippet:', header[0].substring(0, 300).replace(/\s+/g, ' '));
}

const footer = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/gi);
console.log('\nFooter count:', footer ? footer.length : 0);
if (footer) {
  console.log('Footer snippet:', footer[0].substring(0, 300).replace(/\s+/g, ' '));
}
