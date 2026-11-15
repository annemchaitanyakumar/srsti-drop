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
  console.log('Downloading bundle.css...');
  await download('https://www.graza.co/cdn/shop/t/38/assets/bundle.css?v=71186800105651776171793870928', 'bundle.css');
  console.log('Downloaded bundle.css');

  console.log('Downloading fonts.static.css...');
  await download('https://www.graza.co/cdn/shop/t/38/assets/fonts.static.css?v=87305598693487421181770251827', 'fonts.static.css');
  console.log('Downloaded fonts.static.css');
}

main().catch(console.error);
