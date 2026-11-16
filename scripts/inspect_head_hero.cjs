const { execSync } = require('child_process');
const fs = require('fs');

const headIndex = execSync('git show HEAD:index.html', { maxBuffer: 50 * 1024 * 1024 }).toString();

const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const hS3 = headIndex.indexOf(s3Start);
const hS4 = headIndex.indexOf(s4Start);

console.log(headIndex.substring(hS3, hS4));
