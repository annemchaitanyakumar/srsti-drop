const fs = require('fs');

const bundle = fs.readFileSync('bundle.js', 'utf8');

// Look for DOM query selectors like document.querySelectorAll('[vue]') or similar
const vueQueries = bundle.match(/querySelector[^)]+\)/gi) || [];
console.log('Query selectors:');
[...new Set(vueQueries)].filter(q => q.toLowerCase().includes('vue') || q.includes('mount') || q.includes('carousel') || q.includes('hero') || q.includes('header') || q.includes('body')).forEach(q => console.log('  ', q));

// Look for component names in bundle.js
const compMatches = bundle.match(/name:\s*["']([A-Za-z0-9_-]+)["']/g) || [];
console.log('\nVue Component Names:');
[...new Set(compMatches)].slice(0, 50).forEach(c => console.log('  ', c));
