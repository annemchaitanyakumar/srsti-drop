const fs = require('fs');
const path = require('path');

const srcHtml = fs.readFileSync('graza_home.html', 'utf8');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '..', 'assets');
const fontsDir = path.join(assetsDir, 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Copy fonts from public/fonts to assets/fonts
const publicFonts = path.join(__dirname, '..', 'public', 'fonts');
if (fs.existsSync(publicFonts)) {
  fs.readdirSync(publicFonts).forEach(file => {
    fs.copyFileSync(path.join(publicFonts, file), path.join(fontsDir, file));
  });
}

// Copy bundle.css, bundle.js, js-index.static.js, js-polyfill-smooth-scroll.static.js, lottie-player.js, graza-fun-fact.json
fs.copyFileSync('bundle.css', path.join(assetsDir, 'bundle.css'));
fs.copyFileSync('bundle.js', path.join(assetsDir, 'bundle.js'));
fs.copyFileSync('js-index.static.js', path.join(assetsDir, 'js-index.static.js'));
fs.copyFileSync('js-polyfill-smooth-scroll.static.js', path.join(assetsDir, 'js-polyfill-smooth-scroll.static.js'));
fs.copyFileSync('lottie-player.js', path.join(assetsDir, 'lottie-player.js'));
fs.copyFileSync('graza-fun-fact.json', path.join(assetsDir, 'graza-fun-fact.json'));

// Create updated fonts.static.css pointing to ./fonts/
let fontsCss = fs.readFileSync('fonts.static.css', 'utf8');
fontsCss = fontsCss.replace(/url\(([^)]+)\)/g, (match, url) => {
  const cleanUrl = url.replace(/['"]/g, '');
  if (!cleanUrl.startsWith('data:') && !cleanUrl.startsWith('http')) {
    return `url("./fonts/${cleanUrl}")`;
  }
  return match;
});
fs.writeFileSync(path.join(assetsDir, 'fonts.static.css'), fontsCss);

console.log('Copied all assets to assets/');
