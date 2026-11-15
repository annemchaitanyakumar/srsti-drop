const fs = require('fs');

const bundle = fs.readFileSync('assets/bundle.js', 'utf8');

const match = bundle.match(/function [a-zA-Z0-9_$]+\(\)\{return [^}]+\.createApp\(/);
console.log('createApp match:', match ? match[0] : 'not found');

const mountIdx = bundle.indexOf('querySelectorAll("[vue]")');
console.log('Before mount:');
console.log(bundle.substring(mountIdx - 600, mountIdx + 100));
