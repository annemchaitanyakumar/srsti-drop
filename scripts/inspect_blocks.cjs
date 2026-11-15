const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const blocks = html.match(/<div id="shopify-block-[^"]+"[^>]*>[\s\S]*?<\/div>/gi) || [];
blocks.forEach((b, i) => {
  console.log('Block', i, b.substring(0, 150));
});
