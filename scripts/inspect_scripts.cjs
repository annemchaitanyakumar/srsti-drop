const fs = require('fs');
const html = fs.readFileSync('graza_home.html', 'utf8');

const scriptTags = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log('Total script tags:', scriptTags.length);

const externalScripts = [];
scriptTags.forEach(tag => {
  const src = tag.match(/src=["']([^"']+)["']/i);
  if (src) {
    externalScripts.push(src[1]);
  }
});

console.log('External scripts:', externalScripts.filter(s => s.includes('cdn/shop') || s.includes('bundle') || s.includes('app') || s.includes('vendor')));

// Also find inline scripts or data
console.log('\nLooking for Vue / animation setup...');
const inlineScripts = scriptTags.filter(t => !t.includes('src='));
console.log('Inline script count:', inlineScripts.length);

inlineScripts.forEach((s, idx) => {
  if (s.includes('GSAP') || s.includes('gsap') || s.includes('ScrollTrigger') || s.includes('marquee') || s.includes('animation') || s.includes('Vue') || s.includes('vue')) {
    console.log(`Inline script #${idx} matches keywords, length:`, s.length);
  }
});
