const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

// Let's print out the exact structure and Vue components used in each section
const sectionRegex = /<(div|section)[^>]+id="(shopify-section-[^"]+|instagram)"[\s\S]*?(?=(<(div|section)[^>]+id="(shopify-section-|instagram|<footer)|<\/main>))/gi;

let match;
let count = 0;
while ((match = sectionRegex.exec(html)) !== null) {
  count++;
  const content = match[0];
  const id = content.match(/id="([^"]+)"/)[1];
  console.log(`\n========================================`);
  console.log(`SECTION ${count}: ${id} (Length: ${content.length})`);
  
  // Find custom vue components inside this section (e.g. <header-bar, <hero-banner, <image-text-carousel, etc.)
  const tags = content.match(/<([a-z0-9]+-[a-z0-9-]+)[^>]*>/gi) || [];
  console.log('Custom Vue Tags:', tags.map(t => t.match(/<([a-z0-9-]+)/)[1]));
  
  // Save each section to a separate file in scripts/sections/ for easy inspection
  if (!fs.existsSync('scripts/sections')) {
    fs.mkdirSync('scripts/sections', { recursive: true });
  }
  fs.writeFileSync(`scripts/sections/${count}_${id.replace(/[^a-zA-Z0-9_-]/g, '_')}.html`, content);
}

// Also save header and footer
const header = html.match(/<header id="header"[\s\S]*?<\/header>/i);
if (header) {
  fs.writeFileSync('scripts/sections/0_header.html', header[0]);
  console.log('\nSaved header to scripts/sections/0_header.html');
}

const footer = html.match(/<footer id="footer"[\s\S]*?<\/footer>/i);
if (footer) {
  fs.writeFileSync('scripts/sections/99_footer.html', footer[0]);
  console.log('Saved footer to scripts/sections/99_footer.html');
}
