const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

// Find all image sources
const imgUrls = [];
const srcMatches = html.match(/(src|srcset|href|data-src|poster)=["']([^"']+)["']/gi) || [];
srcMatches.forEach(m => {
  const url = m.match(/=["']([^"']+)["']/)[1];
  if (url.includes('cdn/shop') || url.includes('.png') || url.includes('.jpg') || url.includes('.svg') || url.includes('.webp') || url.includes('.mp4')) {
    imgUrls.push(url);
  }
});

console.log('Total media URLs found:', imgUrls.length);
console.log('Sample media URLs (first 20):');
[...new Set(imgUrls)].slice(0, 20).forEach(u => console.log('  ', u));
