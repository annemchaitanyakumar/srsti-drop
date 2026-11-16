const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const heroTarget = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const nextTarget = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const s3Idx = content.indexOf(heroTarget);
const s4Idx = content.indexOf(nextTarget);

console.log('s3Idx:', s3Idx, 's4Idx:', s4Idx);
if (s3Idx !== -1 && s4Idx !== -1) {
  console.log('Hero section length:', s4Idx - s3Idx);
  console.log('Hero start snippet:', content.substring(s3Idx, s3Idx + 120));
  console.log('Hero end snippet:', content.substring(s4Idx - 120, s4Idx));
}
