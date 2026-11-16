const { execSync } = require('child_process');
const fs = require('fs');

const headIndex = execSync('git show HEAD:index.html', { maxBuffer: 50 * 1024 * 1024 }).toString();
fs.writeFileSync('index.html', headIndex, 'utf8');
console.log('Restored index.html to HEAD successfully!');
