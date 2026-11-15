const http = require('http');
const fs = require('fs');
const path = require('path');

function resolveFile(reqUrl) {
  let reqPath = decodeURIComponent(reqUrl.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  let cleanPath = reqPath.replace(/^\/+/, '');
  let resolvedPath = path.join(__dirname, cleanPath);

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    const indexPath = path.join(resolvedPath, 'index.html');
    if (fs.existsSync(indexPath)) return indexPath;
  }

  if (!fs.existsSync(resolvedPath)) {
    if (fs.existsSync(resolvedPath + '.html')) return resolvedPath + '.html';
  }

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }
  return null;
}

const testUrls = [
  '/',
  '/products/sizzle-drizzle-combo-pack',
  '/products/original-mayo',
  '/products/potato-chips',
  '/pages/about-us',
  '/pages/subscribe',
  '/pages/store-locator',
  '/pages/faqs',
  '/collections/all',
  '/collections/olive-oil',
  '/blogs/recipes'
];

testUrls.forEach(u => {
  const file = resolveFile(u);
  console.log(`${u} -> ${file ? 'FOUND: ' + path.relative(__dirname, file) : 'NOT FOUND'}`);
});
