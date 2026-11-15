const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

// Find all elements between <body> and </body>
const bodyContentMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyContentMatch) {
  console.error('Body not found!');
  process.exit(1);
}

const bodyContent = bodyContentMatch[1];
console.log('Body content length:', bodyContent.length);

// Let's list top-level elements inside body
const topLevelTags = [];
let depth = 0;
// We can use a regex or DOM parser
const topElements = bodyContent.match(/<(div|section|header|footer|main|nav|aside)[^>]*id=["'][^"']+["'][^>]*>/gi) || [];
console.log('Top elements with ID in body:');
topElements.forEach(e => console.log('  ', e.substring(0, 100)));
