const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const footerIndex = html.indexOf('id="shopify-section-footer"');
const footerEnd = html.indexOf('</footer>', footerIndex) + 9;
const afterFooter = html.substring(footerEnd, html.indexOf('</body>'));
console.log('After footer length:', afterFooter.length);
console.log('After footer snippet:', afterFooter.substring(0, 500));
