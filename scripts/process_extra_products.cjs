const fs = require('fs');
const path = require('path');

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
          title: "“The Trio”",
          price: 4500,
          final_price: 4500,
          final_line_price: 4500,
          url: "/products/the-trio",
          image: "https://www.graza.co/cdn/shop/files/Trio_Sizzle_Spray.jpg?v=1785772466&width=500"
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
  })();
</script>
`;

extraProducts.forEach(name => {
  const sourcePath = path.join('pages_source', `${name}.html`);
  if (!fs.existsSync(sourcePath)) return;

  let html = fs.readFileSync(sourcePath, 'utf8');
  html = html.replace(/\/\/www\.graza\.co\//g, 'https://www.graza.co/');
  html = html.replace(/\/\/cdn\.shopify\.com\//g, 'https://cdn.shopify.com/');
  html = html.replace(/https:https:\/\//g, 'https://');

  html = html.replace(/href=["'][^"']*bundle\.css[^"']*["']/g, 'href="/assets/bundle.css"');
  html = html.replace(/href=["'][^"']*fonts\.static\.css[^"']*["']/g, 'href="/assets/fonts.static.css"');
  html = html.replace(/src=["'][^"']*bundle\.js[^"']*["']/g, 'src="/assets/bundle.js"');
  html = html.replace(/src=["'][^"']*lottie-player\.js[^"']*["']/g, 'src="/assets/lottie-player.js"');
  html = html.replace(/src=["'][^"']*js-polyfill-smooth-scroll[^"']*["']/g, 'src="/assets/js-polyfill-smooth-scroll.static.js"');
  html = html.replace(/src=["'][^"']*js-index\.static\.js[^"']*["']/g, 'src="/assets/js-index.static.js"');

  if (html.includes('</body>')) {
    html = html.replace('</body>', `${cartMockScript}\n</body>`);
  }

  const dirPath = path.join(__dirname, '..', 'products');
  const subDirPath = path.join(dirPath, name);
  if (!fs.existsSync(subDirPath)) fs.mkdirSync(subDirPath, { recursive: true });

  fs.writeFileSync(path.join(dirPath, `${name}.html`), html, 'utf8');
  fs.writeFileSync(path.join(subDirPath, 'index.html'), html, 'utf8');
  console.log(`Created products/${name}.html and products/${name}/index.html (${html.length} bytes)`);
});
