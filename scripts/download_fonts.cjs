const fs = require('fs');
const https = require('https');
const path = require('path');

const fonts = [
  'gt-alpina-typewriter-light.static.woff2',
  'gt-alpina-typewriter-light-italic.static.woff2',
  'gt-alpina-typewriter-medium.static.woff2',
  'gt-alpina-typewriter-medium-italic.static.woff2',
  'itc-garamond-cond.static.woff2',
  'itc-garamond-cond-italic.static.woff2',
  'apercu-bold.static.woff2'
];

const fontDir = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const font of fonts) {
    const url = `https://www.graza.co/cdn/shop/t/38/assets/${font}`;
    const dest = path.join(fontDir, font);
    console.log(`Downloading ${font}...`);
    try {
      await download(url, dest);
      console.log(`  Success: ${font} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(`  Error downloading ${font}:`, e.message);
    }
  }
}

main();
