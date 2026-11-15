const fs = require('fs');

const bundle = fs.readFileSync('bundle.js', 'utf8');
console.log('bundle.js length:', bundle.length);

// Search for Vue component registrations
const vueComponents = bundle.match(/component\(["']([^"']+)["']/g) || [];
console.log('Vue registered components:', [...new Set(vueComponents)]);

// Search for GSAP / animations
console.log('Includes gsap:', bundle.includes('gsap') || bundle.includes('GSAP'));
console.log('Includes ScrollTrigger:', bundle.includes('ScrollTrigger'));
console.log('Includes anime:', bundle.includes('anime'));
console.log('Includes lottie:', bundle.includes('lottie'));

// Check how Vue is mounted
const mountMatches = bundle.match(/(\.mount\(|\$mount\(|new Vue\()/g) || [];
console.log('Mount matches:', mountMatches);
