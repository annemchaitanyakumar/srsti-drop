const fs = require('fs');
const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const matches = bundle.match(/transition[a-zA-Z0-9_-]*/gi) || [];
console.log('Transitions in bundle.js:', [...new Set(matches)].slice(0, 20));

// Check body classes on graza pages
const html = fs.readFileSync('index.html', 'utf8');
const body = html.match(/<body[^>]*>/i);
console.log('Body tag in index.html:', body ? body[0] : 'not found');
