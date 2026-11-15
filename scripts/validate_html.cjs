const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('HTML size:', html.length);

// 1. Check custom Vue components in index.html
const requiredTags = [
  'header-bar',
  'announcement-bar',
  'image-text-carousel',
  'about-graza',
  'text-carousel',
  'featured-glog-articles',
  'hero-modal',
  'cart-drawer',
  'svg-icon',
  'lottie-player'
];

console.log('\n--- VUE CUSTOM TAGS CHECK ---');
requiredTags.forEach(tag => {
  const count = (html.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length;
  console.log(`  <${tag}>: ${count} occurrences`);
});

// 2. Check protocol-relative URLs
const protoRelative = html.match(/(src|href|poster)=["']\/\/[^"']+["']/gi) || [];
console.log('\n--- PROTOCOL RELATIVE URLS (should be 0) ---');
console.log('  Count:', protoRelative.length);
if (protoRelative.length > 0) {
  console.log('  Sample:', protoRelative.slice(0, 5));
}

// 3. Check assets
const assetFiles = [
  'assets/bundle.css',
  'assets/fonts.static.css',
  'assets/bundle.js',
  'assets/js-index.static.js',
  'assets/js-polyfill-smooth-scroll.static.js',
  'assets/lottie-player.js',
  'assets/graza-fun-fact.json',
  'assets/fonts/gt-alpina-typewriter-light.static.woff2',
  'assets/fonts/gt-alpina-typewriter-light-italic.static.woff2',
  'assets/fonts/gt-alpina-typewriter-medium.static.woff2',
  'assets/fonts/gt-alpina-typewriter-medium-italic.static.woff2',
  'assets/fonts/itc-garamond-cond.static.woff2',
  'assets/fonts/itc-garamond-cond-italic.static.woff2',
  'assets/fonts/apercu-bold.static.woff2'
];

console.log('\n--- ASSETS EXISTENCE CHECK ---');
assetFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const size = exists ? fs.statSync(file).size : 0;
  console.log(`  ${file}: ${exists ? 'OK (' + size + ' bytes)' : 'MISSING'}`);
});

// 4. Check critical inline scripts
console.log('\n--- INLINE SCRIPTS CHECK ---');
console.log('  data-product-cards:', html.includes('data-product-cards'));
console.log('  window.gwps:', html.includes('window.gwps'));
console.log('  window.refillData:', html.includes('window.refillData'));
console.log('  setHeight:', html.includes('function setHeight()'));
console.log('  Shopify Cart mock:', html.includes('window.Shopify'));
