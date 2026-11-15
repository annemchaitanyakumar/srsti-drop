const fs = require('fs');
const path = require('path');

const srcHtml = fs.readFileSync('graza_home.html', 'utf8');

// 1. Extract the Header
const headerMatch = srcHtml.match(/<div id="shopify-section-header"[\s\S]*?<\/header>\s*<\/div>/i);
if (!headerMatch) console.error('Header not found!');

// 2. Extract Cart Drawer
const cartMatch = srcHtml.match(/<div id="shopify-section-cart-drawer"[\s\S]*?<\/cart-drawer>\s*<\/div>/i);
if (!cartMatch) console.error('Cart drawer not found!');

// 3. Extract Main content
const mainMatch = srcHtml.match(/<main[\s\S]*?<\/main>/i);
if (!mainMatch) console.error('Main not found!');

// 4. Extract Instagram section
const instaMatch = srcHtml.match(/<div id="shopify-section-instagram"[\s\S]*?<\/section>\s*<\/div>/i);
if (!instaMatch) console.error('Instagram section not found!');

// 5. Extract Footer section
const footerMatch = srcHtml.match(/<div id="shopify-section-footer"[\s\S]*?<\/footer>\s*<\/div>/i);
if (!footerMatch) console.error('Footer section not found!');

// 6. Extract data-product-cards
const prodCardsMatch = srcHtml.match(/<script[^>]*data-product-cards[^>]*>[\s\S]*?<\/script>/i);
if (!prodCardsMatch) console.error('Product cards not found!');

// 7. Extract window.gwps
const gwpsMatch = srcHtml.match(/window\.gwps\s*=\s*\{[\s\S]*?\};/i);

// 8. Extract window.refillData
const refillMatch = srcHtml.match(/window\.refillData\s*=\s*\{[\s\S]*?\};/i);

console.log('Found components:');
console.log('  Header:', headerMatch ? headerMatch[0].length : 0);
console.log('  Cart:', cartMatch ? cartMatch[0].length : 0);
console.log('  Main:', mainMatch ? mainMatch[0].length : 0);
console.log('  Instagram:', instaMatch ? instaMatch[0].length : 0);
console.log('  Footer:', footerMatch ? footerMatch[0].length : 0);
console.log('  Product cards script:', prodCardsMatch ? prodCardsMatch[0].length : 0);
console.log('  gwps:', gwpsMatch ? gwpsMatch[0].length : 0);
console.log('  refillData:', refillMatch ? refillMatch[0].length : 0);
