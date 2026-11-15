const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');

const bodyTag = html.match(/<body[^>]*>/i);
console.log('Body tag:', bodyTag ? bodyTag[0] : 'not found');

const htmlTag = html.match(/<html[^>]*>/i);
console.log('HTML tag:', htmlTag ? htmlTag[0] : 'not found');
