const fs = require('fs');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
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
  await download('https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js', 'lottie-player.js');
  console.log('Downloaded lottie-player.js');
  await download('https://www.graza.co/cdn/shop/t/38/assets/js-polyfill-smooth-scroll.static.js?v=148379743528603512151686646138', 'js-polyfill-smooth-scroll.static.js');
  console.log('Downloaded js-polyfill-smooth-scroll.static.js');
}

main().catch(console.error);
