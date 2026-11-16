const fs = require('fs');
const { heroHTML } = require('./build_creative_hero.cjs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const s3Idx = indexHtml.indexOf(s3Start);
const s4Idx = indexHtml.indexOf(s4Start);

if (s3Idx === -1 || s4Idx === -1) {
  console.error('ERROR: Could not locate Section 3 or Section 4 boundaries in index.html!');
  process.exit(1);
}

// Backup index.html
fs.writeFileSync('index.html.bak', indexHtml);
console.log('Backed up index.html -> index.html.bak');

const beforeHero = indexHtml.substring(0, s3Idx);
const afterHero = indexHtml.substring(s4Idx);

const replacement = `<div id="shopify-section-template--16889120686294__hero_b6MgCY" class="shopify-section hero__section">
${heroHTML}
</div>

`;

const newIndexHtml = beforeHero + replacement + afterHero;
fs.writeFileSync('index.html', newIndexHtml);
console.log('Successfully applied 5-layer parallax hero to index.html! New length:', newIndexHtml.length);
