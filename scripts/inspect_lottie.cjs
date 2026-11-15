const fs = require('fs');

const html = fs.readFileSync('graza_home.html', 'utf8');
const lottieMatches = html.match(/<lottie-player[^>]*>/gi) || [];
console.log('Lottie player tags:', lottieMatches);

const jsonMatches = html.match(/src=["']([^"']+\.json[^"']*)["']/gi) || [];
console.log('JSON matches:', jsonMatches);
