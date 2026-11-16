const fs = require('fs');
const path = require('path');

const files = [
  'driz_srsti.jpg',
  'sizzle_srsti.jpg',
  'squeeze_srsti.jpg',
  'homepage_feature_srsti.jpg',
  'recipe_sear_srsti.jpg',
  'About_page_update_FRESH_IS_ALWAYS_BEST.png',
  'About_page_update_HAPPY_OLIVES_HAPPY_OIL.png',
  'garnish.png',
  'bake.png',
  'drizzle_bottle.png',
  'sizzle_bottle.png'
];

files.forEach(f => {
  const p = path.join('assets', 'images', f);
  if (!fs.existsSync(p)) return;
  const buf = fs.readFileSync(p);
  let dim = 'unknown';
  if (buf.readUInt32BE(0) === 0x89504E47) {
    dim = `${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)} (PNG)`;
  } else if (buf[0] === 0xFF && buf[1] === 0xD8) {
    dim = 'JPEG';
  }
  console.log(f.padEnd(45), dim, (buf.length / 1024).toFixed(1) + ' KB');
});
