const fs = require('fs');

const html = fs.readFileSync('scripts/sections/7_shopify-section-template--16889120686294__about_graza_xbM84F.html', 'utf8');

const slotOlive = html.match(/<template v-slot:olive>([\s\S]*?)<\/template>/i);
if (slotOlive) {
  console.log('Slot olive content:');
  console.log(slotOlive[1]);
}
