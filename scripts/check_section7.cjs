const fs = require('fs');

const section7 = fs.readFileSync('scripts/sections/7_shopify-section-template--16889120686294__about_graza_xbM84F.html', 'utf8');

console.log('Section 7 length:', section7.length);
console.log('Contains intro-drop?:', section7.includes('intro-drop'));
console.log('Contains template v-slot:olive?:', section7.includes('v-slot:olive'));
console.log('Contains template v-slot:content?:', section7.includes('v-slot:content'));
console.log('Section 7 first 500 chars:\n', section7.substring(0, 500));
console.log('\nSection 7 last 500 chars:\n', section7.substring(section7.length - 500));
