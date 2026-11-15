const fs = require('fs');
const path = require('path');

function copyTo(src, destDir, destName) {
  if (!fs.existsSync(src)) return;
  const content = fs.readFileSync(src, 'utf8');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, `${destName}.html`), content, 'utf8');

  const subDir = path.join(destDir, destName);
  if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });
  fs.writeFileSync(path.join(subDir, 'index.html'), content, 'utf8');
  console.log(`Created alias ${destDir}/${destName}`);
}

copyTo('collections/all.html', 'collections', 'bundles');
copyTo('collections/all.html', 'collections', 'gifts');
copyTo('blogs/recipes.html', 'pages', 'glog');
copyTo('products/sizzle-drizzle-combo-pack.html', 'products', 'the-trio');
copyTo('products/original-mayo.html', 'products', 'fancy-mayo');
copyTo('products/original-mayo.html', 'products', 'garlic-aioli');
