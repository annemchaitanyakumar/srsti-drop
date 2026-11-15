const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('pages_source').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(path.join('pages_source', file), 'utf8');
  console.log(`\n================== ${file} (${content.length} bytes) ==================`);

  ['tap', 'Tap', 'TAP', 'drop', 'Drop', 'drip', 'Drip', 'intro-drop', 'svg-icon'].forEach(word => {
    const matches = content.match(new RegExp('[a-zA-Z0-9_-]*' + word + '[a-zA-Z0-9_-]*', 'g')) || [];
    const unique = [...new Set(matches)];
    if (unique.length > 0) {
      console.log(`  ${word} (${unique.length}):`, unique.slice(0, 10));
    }
  });

  // Also check Vue components on each page
  const vueTags = content.match(/<([a-z0-9]+-[a-z0-9-]+)[^>]*>/gi) || [];
  const uniqueVue = [...new Set(vueTags.map(t => t.match(/<([a-z0-9-]+)/)[1]))];
  console.log('  Vue components:', uniqueVue);
});
