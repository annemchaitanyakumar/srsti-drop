const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const mainIndex = html.indexOf('<main');
const mainEnd = html.indexOf('</main>');
const mainContent = html.substring(mainIndex, mainEnd);

console.log('Main content length:', mainContent.length);

// Find top level children inside main
// In Shopify, sections are often <div id="shopify-section-..." class="shopify-section"> or similar
const divSections = mainContent.match(/<(div|section)[^>]+id=["']shopify-section-[^"']+["'][^>]*>/gi) || [];
console.log('Shopify sections count:', divSections.length);
divSections.forEach(s => console.log('Section:', s));

// Also let's list all elements inside main that have an id
const idElements = mainContent.match(/<[a-z0-9-]+[^>]+id=["'][^"']+["'][^>]*>/gi) || [];
console.log('\nID Elements count in main:', idElements.length);
idElements.slice(0, 30).forEach(e => console.log('  ', e.substring(0, 120)));
