const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');
const start = html.indexOf('id="shopify-section-header"');
const end = html.indexOf('id="shopify-section-cart-drawer"');
console.log('Header region length:', end - start);
console.log('Snippet of header end:');
console.log(html.substring(end - 150, end));
