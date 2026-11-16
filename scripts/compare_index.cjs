const { execSync } = require('child_process');
const fs = require('fs');

const headIndex = execSync('git show HEAD:index.html', { maxBuffer: 50 * 1024 * 1024 }).toString();
const currIndex = fs.readFileSync('index.html', 'utf8');

const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const hS3 = headIndex.indexOf(s3Start);
const hS4 = headIndex.indexOf(s4Start);

const cS3 = currIndex.indexOf(s3Start);
const cS4 = currIndex.indexOf(s4Start);

const headBefore = headIndex.substring(0, hS3);
const currBefore = currIndex.substring(0, cS3);

const headAfter = headIndex.substring(hS4);
const currAfter = currIndex.substring(cS4);

console.log('Before hero identical?:', headBefore === currBefore);
console.log('After hero identical?:', headAfter === currAfter);
