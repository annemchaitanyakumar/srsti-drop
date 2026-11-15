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
  await download('https://www.graza.co/cdn/shop/t/38/assets/bundle.js?v=181560075106118730161793870928', 'bundle.js');
  console.log('Downloaded bundle.js');
  await download('https://www.graza.co/cdn/shop/t/38/assets/js-index.static.js?v=23196261611953381311742824075', 'js-index.static.js');
  console.log('Downloaded js-index.static.js');
}

main().catch(console.error);
