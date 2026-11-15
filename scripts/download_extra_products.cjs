const { execSync } = require('child_process');
const fs = require('fs');

const extraProducts = [
  'duo-refill-can',
  'drizzle',
  'sizzle',
  'the-starter-kit',
  'sizzle-bag-in-box',
  'drizzle-refill-can',
  'sizzle-refill-can',
  'gift-set-drizzle-sizzle',
  'the-graza-tote'
];

for (const p of extraProducts) {
  const file = `pages_source/${p}.html`;
  console.log(`Downloading ${p}...`);
  try {
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "https://www.graza.co/products/${p}" -o "${file}"`);
    console.log(`  Success: ${p} (${fs.statSync(file).size} bytes)`);
  } catch (e) {
    console.error(`  Failed: ${p}`);
  }
}
