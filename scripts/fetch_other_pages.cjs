const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  { name: 'about_us', url: 'https://www.graza.co/pages/about-us' },
  { name: 'subscribe', url: 'https://www.graza.co/pages/subscribe' },
  { name: 'products_duo', url: 'https://www.graza.co/products/sizzle-drizzle-combo-pack' },
  { name: 'collections_all', url: 'https://www.graza.co/collections/all' },
  { name: 'store_locator', url: 'https://www.graza.co/pages/store-locator' },
  { name: 'faqs', url: 'https://www.graza.co/pages/faqs' }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync('pages_source')) fs.mkdirSync('pages_source');
  for (const page of urls) {
    console.log(`Fetching ${page.name} (${page.url})...`);
    try {
      const html = await fetchUrl(page.url);
      fs.writeFileSync(`pages_source/${page.name}.html`, html, 'utf8');
      console.log(`  Saved ${page.name}.html (${html.length} bytes)`);
    } catch (e) {
      console.error(`  Failed ${page.name}:`, e.message);
    }
  }
}

main();
