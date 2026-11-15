const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

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
    resHeaders['cache-control'] = 'public, max-age=86400';
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

  if (reqPath.includes('driz_450x') || reqPath.includes('driz.jpg') || (reqPath.includes('drizzle') && (reqPath.endsWith('.jpg') || reqPath.endsWith('.png')) && !reqPath.includes('can'))) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'driz_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('sizzle750ml') || reqPath.includes('sizzle_450x') || (reqPath.includes('sizzle') && (reqPath.endsWith('.jpg') || reqPath.endsWith('.png')) && !reqPath.includes('can') && !reqPath.includes('glass') && !reqPath.includes('box'))) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'sizzle_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('squeeze_') || reqPath.includes('squeeze_450x')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'squeeze_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('duo-cans') || reqPath.includes('duo_cans')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'duo_cans_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Duo-Glass') || reqPath.includes('duo-glass')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'duo_glass_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Trio_PDP_4') || reqPath.includes('trio_srsti') || reqPath.includes('Trio_Sizzle')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'trio_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Homepage_Feature') || reqPath.includes('homepage_feature')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'homepage_feature_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Resize12') || reqPath.includes('Resize24')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'duo_cans_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Resize13') || reqPath.includes('Resize15')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'driz_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Resize14') || reqPath.includes('Resize22')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'sizzle_srsti.jpg');
    isProductImage = true;
  } else if (reqPath.includes('Vertical_b4a7a293') || reqPath.includes('recipe_sear')) {
    resolvedPath = path.join(ROOT, 'assets', 'images', 'recipe_sear_srsti.jpg');
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
