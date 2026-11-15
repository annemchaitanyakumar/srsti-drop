const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('pages_source').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(path.join('pages_source', file), 'utf8');
  // Check image alt tags
  const alts = content.match(/alt=["']([^"']+)["']/gi) || [];
  alts.forEach(alt => {
    if (alt.toLowerCase().includes('tap') || alt.toLowerCase().includes('drop') || alt.toLowerCase().includes('drip') || alt.toLowerCase().includes('faucet') || alt.toLowerCase().includes('pour')) {
      console.log(`[${file}] ALT MATCH:`, alt);
    }
  });

  // Check headings or text
  const headings = content.match(/<(h[1-6]|p|span|div)[^>]*>([^<]*(?:tap|drop|drip|pour)[^<]*)<\/\1>/gi) || [];
  headings.forEach(h => {
    console.log(`[${file}] TEXT MATCH:`, h.substring(0, 100));
  });
});
