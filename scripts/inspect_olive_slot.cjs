const fs = require('fs');

const html = fs.readFileSync('scripts/sections/7_shopify-section-template--16889120686294__about_graza_xbM84F.html', 'utf8');

const oliveStart = html.indexOf('<template v-slot:olive>');
const oliveEnd = html.indexOf('</template>', oliveStart);
console.log('Olive slot length:', oliveEnd - oliveStart);
console.log('Olive slot snippet:');
console.log(html.substring(oliveStart, oliveStart + 400));
console.log('...');
console.log(html.substring(oliveEnd - 300, oliveEnd + 11));
