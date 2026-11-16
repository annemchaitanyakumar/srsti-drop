const fs = require('fs');
const path = require('path');
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

const buf = fs.readFileSync(path.join(artDir, 'scroll_1200px.png'));
console.log('PNG header:', buf.subarray(0, 32).toString('hex'));
console.log('PNG size:', buf.length);
