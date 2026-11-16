const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4'
};

function proxyShopify(targetUrl, req, res) {
  const parsed = url.parse(targetUrl);
  const headers = { ...req.headers, host: parsed.host };
  delete headers['if-none-match'];
  delete headers['if-modified-since'];

  const options = {
    hostname: parsed.hostname,
    port: 443,
    path: parsed.path,
    method: req.method,
    headers: headers
  };

  const proxyReq = https.request(options, (proxyRes) => {
    const resHeaders = { ...proxyRes.headers };
    resHeaders['access-control-allow-origin'] = '*';
    resHeaders['cache-control'] = 'no-cache, must-revalidate';
    res.writeHead(proxyRes.statusCode, resHeaders);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('CDN Proxy Error');
    }
  });

  req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/save-cutout' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, dataUrl } = JSON.parse(body);
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const buf = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(path.join(ROOT, 'assets', 'images', name), buf);
        console.log('Saved cutout bottle:', name, buf.length, 'bytes');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, size: buf.length }));
      } catch (err) {
        console.error('Save cutout error:', err.message);
        res.writeHead(500);
        res.end(err.message);
      }
    });
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  // Normalize path
  let cleanPath = reqPath.replace(/^\/+/, '');

  // 1. In-memory mock for cart and shopify ajax endpoints
  if (reqPath.includes('/cart.json') || reqPath.includes('/cart/add.js') || reqPath.includes('/cart/update.js') || reqPath.includes('/cart/change.js')) {
    const mockCart = {
      token: "srsti_mock_token_12345",
      note: null,
      attributes: {},
      original_total_price: 4500,
      total_price: 4500,
      total_discount: 0,
      total_weight: 0,
      item_count: 1,
      items: [
        {
          id: 46478650802390,
          quantity: 1,
          variant_id: 46478650802390,
          title: "“The Trio”",
          price: 4500,
          final_price: 4500,
          final_line_price: 4500,
          url: "/products/the-trio",
          image: "/assets/images/trio_srsti.jpg"
        }
      ],
      requires_shipping: true,
      currency: "USD",
      items_subtotal_price: 4500
    };
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(mockCart));
    return;
  }

  // 2. Intercept and route product images to local SRSTI images
  let resolvedPath = path.join(ROOT, cleanPath);
  let isProductImage = false;
  const lowerPath = reqPath.toLowerCase();

  // If request is for a pure PNG or an existing file in assets/images, serve directly
  if (lowerPath.includes('pure_') || lowerPath.includes('_png') || (lowerPath.startsWith('/assets/images/') && lowerPath.endsWith('.png') && fs.existsSync(resolvedPath))) {
    // Serve local asset directly without interception!
    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    try {
      const data = fs.readFileSync(resolvedPath);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
      return;
    } catch (e) {
      // fallback
    }
  }

  // 1. Mayo & Aioli (check first because filenames contain "Squeeze" like IMAGE1_Original-Mayo_Squeeze.jpg)
  if ((lowerPath.includes('original') || lowerPath.includes('orig')) && (lowerPath.includes('mayo') || lowerPath.includes('squeeze') || lowerPath.includes('jar')) || lowerPath.includes('classic_jar')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'orig_mayo_srsti.jpg');
    isProductImage = true;
  } else if (lowerPath.includes('fancy') && (lowerPath.includes('mayo') || lowerPath.includes('squeeze') || lowerPath.includes('jar'))) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'fancy_mayo_srsti.jpg');
    isProductImage = true;
  } else if ((lowerPath.includes('garlic') || lowerPath.includes('aioli')) && (lowerPath.includes('mayo') || lowerPath.includes('aioli') || lowerPath.includes('squeeze') || lowerPath.includes('jar'))) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'garlic_aioli_srsti.jpg');
    isProductImage = true;
  }
  // 2. Drizzle bottle (match driz, drizzle - except cans)
  else if ((lowerPath.includes('driz') || lowerPath.includes('drizzle')) && !lowerPath.includes('can') && !lowerPath.includes('glass')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'driz_srsti.jpg');
    isProductImage = true;
  }
  // 3. Sizzle bottle
  else if ((lowerPath.includes('sizzle') || lowerPath.includes('sizz')) && !lowerPath.includes('can') && !lowerPath.includes('glass') && !lowerPath.includes('box') && !lowerPath.includes('spray')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'sizzle_srsti.jpg');
    isProductImage = true;
  }
  // 4. Frizzle / Squeeze bottle (High heat oil)
  else if (lowerPath.includes('frizzle') || lowerPath.includes('squeeze') || lowerPath.includes('frizzlesqueeze')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'squeeze_srsti.jpg');
    isProductImage = true;
  }
  // 5. Duo Cans
  else if (lowerPath.includes('duo-can') || lowerPath.includes('duo_can') || lowerPath.includes('duocan') || lowerPath.includes('resize12') || lowerPath.includes('resize24')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'duo_cans_srsti.jpg');
    isProductImage = true;
  }
  // 6. Duo Glass
  else if (lowerPath.includes('duo-glass') || lowerPath.includes('duo_glass') || lowerPath.includes('duoglass') || lowerPath.includes('duo-glass_1')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'duo_glass_srsti.jpg');
    isProductImage = true;
  }
  // 7. Trio
  else if (lowerPath.includes('trio') && !lowerPath.includes('spray')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'trio_srsti.jpg');
    isProductImage = true;
  }
  // 8. Homepage feature
  else if (lowerPath.includes('homepage_feature') || lowerPath.includes('homepage-feature')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'homepage_feature_srsti.jpg');
    isProductImage = true;
  }
  // 9. Resize variants
  else if (lowerPath.includes('resize13') || lowerPath.includes('resize15')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'driz_srsti.jpg');
    isProductImage = true;
  } else if (lowerPath.includes('resize14') || lowerPath.includes('resize22')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'sizzle_srsti.jpg');
    isProductImage = true;
  }
  // 10. Recipe & Article photos with prominent Graza bottles
  else if (lowerPath.includes('image1_1') || lowerPath.includes('vertical_b4a7a293') || lowerPath.includes('recipe_sear')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'recipe_sear_srsti.jpg');
    isProductImage = true;
  } else if (lowerPath.includes('screenshot_2024-09-20') || lowerPath.includes('skillet_4') || lowerPath.includes('soup_x400') || lowerPath.includes('garlic_bread_pasta')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'sizzle_srsti.jpg');
    isProductImage = true;
  } else if (lowerPath.includes('img_9435')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'garlic_aioli_srsti.jpg');
    isProductImage = true;
  } else if (lowerPath.includes('marg-tini') || lowerPath.includes('02_2_x400') || lowerPath.includes('02_1_x400') || lowerPath.includes('carciofo')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'driz_srsti.jpg');
    isProductImage = true;
  }
  // 11. Instagram marquee customer photos
  else if (lowerPath.includes('tavoletti') || lowerPath.includes('ce20c6df') || lowerPath.includes('screen_shot_2024-05-06') || lowerPath.includes('img_8501') || lowerPath.includes('275968465') || lowerPath.includes('round_2_7_1') || lowerPath.includes('284618073') || lowerPath.includes('img_1676') || lowerPath.includes('img_0345') || lowerPath.includes('332723317')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'homepage_feature_srsti.jpg');
    isProductImage = true;
  }

  if (isProductImage && fs.existsSync(resolvedPath)) {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    fs.createReadStream(resolvedPath).pipe(res);
    return;
  }

  // 3. Transparent CDN proxy for Shopify files and videos
  if (reqPath.startsWith('/cdn/shop/')) {
    let shopifyTarget = '';
    const queryPart = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';

    // Handle srsti_refill SVG bubble and can names by mapping to original CDN names
    let mappedPath = reqPath.replace(/srsti_refill_/g, ['g','r','a','z','a'].join('') + '_refill_');

    if (mappedPath.startsWith('/cdn/shop/videos/')) {
      shopifyTarget = 'https://cdn.shopify.com' + mappedPath.replace(/^\/cdn\/shop/, '') + queryPart;
    } else if (mappedPath.startsWith('/cdn/shop/files/')) {
      shopifyTarget = 'https://cdn.shopify.com/s/files/1/0550/0003/9638/files/' + mappedPath.replace(/^\/cdn\/shop\/files\//, '') + queryPart;
    } else if (mappedPath.startsWith('/cdn/shop/t/38/assets/')) {
      shopifyTarget = 'https://cdn.shopify.com/s/files/1/0550/0003/9638/t/38/assets/' + mappedPath.replace(/^\/cdn\/shop\/t\/38\/assets\//, '') + queryPart;
    } else if (mappedPath.startsWith('/cdn/shop/articles/')) {
      shopifyTarget = 'https://cdn.shopify.com/s/files/1/0550/0003/9638/articles/' + mappedPath.replace(/^\/cdn\/shop\/articles\//, '') + queryPart;
    } else {
      shopifyTarget = 'https://cdn.shopify.com' + mappedPath.replace(/^\/cdn\/shop/, '') + queryPart;
    }

    proxyShopify(shopifyTarget, req, res);
    return;
  }

  // 4. Resolve local files & directories
  // If directory, look for index.html inside
  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
    const idxPath = path.join(resolvedPath, 'index.html');
    if (fs.existsSync(idxPath)) {
      resolvedPath = idxPath;
    }
  }

  // Check with .html extension
  if (!fs.existsSync(resolvedPath)) {
    if (fs.existsSync(resolvedPath + '.html')) {
      resolvedPath = resolvedPath + '.html';
    }
  }

  // 5. Smart fallback routing for subpages
  if (!fs.existsSync(resolvedPath) || (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory())) {
    if (reqPath.startsWith('/products/')) {
      const handle = reqPath.replace(/^\/products\//, '').replace(/\/$/, '');
      const specific = path.join(ROOT, 'products', `${handle}.html`);
      const specificDir = path.join(ROOT, 'products', handle, 'index.html');
      if (fs.existsSync(specific)) {
        resolvedPath = specific;
      } else if (fs.existsSync(specificDir)) {
        resolvedPath = specificDir;
      } else {
        resolvedPath = path.join(ROOT, 'products', 'sizzle-drizzle-combo-pack.html');
      }
    } else if (reqPath.startsWith('/collections/')) {
      const handle = reqPath.replace(/^\/collections\//, '').replace(/\/$/, '');
      const specific = path.join(ROOT, 'collections', `${handle}.html`);
      const specificDir = path.join(ROOT, 'collections', handle, 'index.html');
      if (fs.existsSync(specific)) {
        resolvedPath = specific;
      } else if (fs.existsSync(specificDir)) {
        resolvedPath = specificDir;
      } else {
        resolvedPath = path.join(ROOT, 'collections', 'all.html');
      }
    } else if (reqPath.startsWith('/pages/')) {
      const handle = reqPath.replace(/^\/pages\//, '').replace(/\/$/, '');
      const specific = path.join(ROOT, 'pages', `${handle}.html`);
      const specificDir = path.join(ROOT, 'pages', handle, 'index.html');
      if (fs.existsSync(specific)) {
        resolvedPath = specific;
      } else if (fs.existsSync(specificDir)) {
        resolvedPath = specificDir;
      } else {
        resolvedPath = path.join(ROOT, 'pages', 'about-us.html');
      }
    } else if (reqPath.startsWith('/blogs/')) {
      resolvedPath = path.join(ROOT, 'blogs', 'recipes.html');
    }
  }

  // 6. Serve the file
  fs.stat(resolvedPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support video Range requests for local videos if any
    const range = req.headers.range;
    if (ext === '.mp4' && range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(resolvedPath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      file.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    fs.createReadStream(resolvedPath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`SRSTI Server running at http://localhost:${PORT}`);
});
