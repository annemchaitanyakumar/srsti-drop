const { execSync } = require('child_process');
const fs = require('fs');

const pages = [
  { name: 'the-duo', url: 'https://www.graza.co/products/sizzle-drizzle-combo-pack' },
  { name: 'original-mayo', url: 'https://www.graza.co/products/original-mayo' },
  { name: 'potato-chips', url: 'https://www.graza.co/products/potato-chips' },
  { name: 'collections-all', url: 'https://www.graza.co/collections/all' },
  { name: 'collections-olive-oil', url: 'https://www.graza.co/collections/olive-oil' },
  { name: 'subscribe', url: 'https://www.graza.co/pages/subscribe' },
  { name: 'store-locator', url: 'https://www.graza.co/pages/store-locator' },
  { name: 'faqs', url: 'https://www.graza.co/pages/faqs' },
  { name: 'recipes', url: 'https://www.graza.co/blogs/recipes' }
];

if (!fs.existsSync('pages_source')) fs.mkdirSync('pages_source');

for (const p of pages) {
  const file = `pages_source/${p.name}.html`;
  console.log(`Downloading ${p.name}...`);
  try {
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${p.url}" -o "${file}"`);
    console.log(`  Success: ${p.name} (${fs.statSync(file).size} bytes)`);
  } catch (e) {
    console.error(`  Failed: ${p.name}`);
  }
}
