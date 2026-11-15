const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

const scripts = [];
const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
while ((m = scriptRegex.exec(html)) !== null) {
  const attrs = m[1];
  const content = m[2];
  const src = attrs.match(/src=["']([^"']+)["']/i);
  scripts.push({
    src: src ? src[1] : null,
    attrs,
    contentPreview: content.trim().substring(0, 100),
    length: content.length
  });
}

console.log('Total scripts found:', scripts.length);
scripts.forEach((s, idx) => {
  if (s.src) {
    console.log(`[#${idx}] SRC: ${s.src}`);
  } else {
    console.log(`[#${idx}] INLINE (${s.length} chars): ${s.contentPreview.replace(/\s+/g, ' ')}`);
  }
});
