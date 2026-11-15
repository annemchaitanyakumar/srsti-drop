const fs = require('fs');
const path = require('path');

const pageMapping = [
  { source: 'the-duo.html', targetDir: 'products', targetName: 'sizzle-drizzle-combo-pack' },
  { source: 'original-mayo.html', targetDir: 'products', targetName: 'original-mayo' },
  { source: 'potato-chips.html', targetDir: 'products', targetName: 'potato-chips' },
  { source: 'about_us_real.html', targetDir: 'pages', targetName: 'about-us' },
  { source: 'subscribe.html', targetDir: 'pages', targetName: 'subscribe' },
  { source: 'store-locator.html', targetDir: 'pages', targetName: 'store-locator' },
  { source: 'faqs.html', targetDir: 'pages', targetName: 'faqs' },
  { source: 'collections-all.html', targetDir: 'collections', targetName: 'all' },
  { source: 'collections-olive-oil.html', targetDir: 'collections', targetName: 'olive-oil' },
  { source: 'recipes.html', targetDir: 'blogs', targetName: 'recipes' }
];

const cartMockScript = `
<script>
  window.Shopify = window.Shopify || {
    shop: "getgraza.myshopify.com",
    locale: "en",
    currency: { active: "USD", rate: "1.0" },
    country: "US",
    designMode: false
  };

  (function() {
    const mockCart = {
      token: "graza_mock_token_12345",
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
          key: "46478650802390:1",
          title: "“The Trio”",
          price: 4500,
          original_price: 4500,
          discounted_price: 4500,
          line_price: 4500,
          original_line_price: 4500,
          total_discount: 0,
          discounts: [],
          sku: "TRIO-01",
          vendor: "Graza",
          product_id: 8844234358998,
          gift_card: false,
          final_price: 4500,
          final_line_price: 4500,
          url: "/products/the-trio",
          featured_image: {
            url: "https://www.graza.co/cdn/shop/files/Trio_Sizzle_Spray.jpg?v=1785772466&width=500",
            alt: "“The Trio”"
          },
          image: "https://www.graza.co/cdn/shop/files/Trio_Sizzle_Spray.jpg?v=1785772466&width=500",
          handle: "the-trio",
          product_type: "Extra Virgin Olive Oil",
          product_title: "“The Trio”",
          variant_title: "Standard"
        }
      ],
      requires_shipping: true,
      currency: "USD",
      items_subtotal_price: 4500
    };

    const originalFetch = window.fetch;
    window.fetch = async function(resource, init) {
      const url = typeof resource === 'string' ? resource : (resource ? resource.url : '');
      if (url.includes('/cart.json')) {
        return new Response(JSON.stringify(mockCart), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (url.includes('/cart/add.js') || url.includes('/cart/add')) {
        return new Response(JSON.stringify(mockCart.items[0]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (url.includes('/cart/update.js') || url.includes('/cart/change.js')) {
        return new Response(JSON.stringify(mockCart), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return originalFetch.apply(this, arguments);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(method, url) {
      this._interceptUrl = url;
      return originalOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function(body) {
      if (this._interceptUrl && (this._interceptUrl.includes('/cart.json') || this._interceptUrl.includes('/cart/add.js') || this._interceptUrl.includes('/cart/update.js') || this._interceptUrl.includes('/cart/change.js'))) {
        Object.defineProperty(this, 'status', { get: () => 200 });
        Object.defineProperty(this, 'readyState', { get: () => 4 });
        const resp = this._interceptUrl.includes('/cart/add.js') ? JSON.stringify(mockCart.items[0]) : JSON.stringify(mockCart);
        Object.defineProperty(this, 'responseText', { get: () => resp });
        Object.defineProperty(this, 'response', { get: () => resp });
        setTimeout(() => {
          if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
          this.dispatchEvent(new Event('readystatechange'));
          if (typeof this.onload === 'function') this.onload();
          this.dispatchEvent(new Event('load'));
        }, 10);
        return;
      }
      return originalSend.apply(this, arguments);
    };

    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        document.body.classList.remove('overlay-active');
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 600);
    });
    window.addEventListener('load', function() {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  })();
</script>
`;

pageMapping.forEach(({ source, targetDir, targetName }) => {
  const sourcePath = path.join('pages_source', source);
  if (!fs.existsSync(sourcePath)) {
    console.log(`Source not found: ${sourcePath}`);
    return;
  }

  let html = fs.readFileSync(sourcePath, 'utf8');

  // Replace protocol-relative URLs
  html = html.replace(/\/\/www\.graza\.co\//g, 'https://www.graza.co/');
  html = html.replace(/\/\/cdn\.shopify\.com\//g, 'https://cdn.shopify.com/');

  // Replace assets with absolute /assets/ paths so subdirectories work
  html = html.replace(/href=["'][^"']*bundle\.css[^"']*["']/g, 'href="/assets/bundle.css"');
  html = html.replace(/href=["'][^"']*fonts\.static\.css[^"']*["']/g, 'href="/assets/fonts.static.css"');
  html = html.replace(/src=["'][^"']*bundle\.js[^"']*["']/g, 'src="/assets/bundle.js"');
  html = html.replace(/src=["'][^"']*lottie-player\.js[^"']*["']/g, 'src="/assets/lottie-player.js"');
  html = html.replace(/src=["'][^"']*js-polyfill-smooth-scroll[^"']*["']/g, 'src="/assets/js-polyfill-smooth-scroll.static.js"');
  html = html.replace(/src=["'][^"']*js-index\.static\.js[^"']*["']/g, 'src="/assets/js-index.static.js"');

  // Inject cartMockScript before </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${cartMockScript}\n</body>`);
  }

  // Ensure target directories exist
  const dirPath = path.join(__dirname, '..', targetDir);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  const subDirPath = path.join(dirPath, targetName);
  if (!fs.existsSync(subDirPath)) fs.mkdirSync(subDirPath, { recursive: true });

  // Write file as targetName.html and targetName/index.html
  const filePath1 = path.join(dirPath, `${targetName}.html`);
  const filePath2 = path.join(subDirPath, 'index.html');
  fs.writeFileSync(filePath1, html, 'utf8');
  fs.writeFileSync(filePath2, html, 'utf8');
  console.log(`Created ${targetDir}/${targetName}.html and ${targetDir}/${targetName}/index.html (${html.length} bytes)`);
});
