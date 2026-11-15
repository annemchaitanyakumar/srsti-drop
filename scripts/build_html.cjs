const fs = require('fs');
const path = require('path');

const srcHtml = fs.readFileSync('graza_home.html', 'utf8');

// 1. Get Body opening
const bodyTagMatch = srcHtml.match(/<body[^>]*>/i);
const bodyTag = bodyTagMatch[0];

// 2. Get the DOM content from a11y-status up to end of footer
const a11yIndex = srcHtml.indexOf('<div id="a11y-status"');
const footerEndIndex = srcHtml.indexOf('</footer>', a11yIndex) + 9;
const footerSectionEnd = srcHtml.indexOf('</div>', footerEndIndex) + 6;
const domContent = srcHtml.substring(a11yIndex, footerSectionEnd);

// 3. Get the theme color styles
const colorStyleMatch = srcHtml.match(/<style>\s*:root\s*\{[\s\S]*?--color-brand:[\s\S]*?<\/style>/i);
const colorStyle = colorStyleMatch ? colorStyleMatch[0] : '';

// 4. Get setHeight script
const setHeightMatch = srcHtml.match(/<script>\s*var width = 0;[\s\S]*?setHeight\(\);[\s\S]*?<\/script>/i);
const setHeightScript = setHeightMatch ? setHeightMatch[0] : '';

// 5. Get window.gwps
const gwpsMatch = srcHtml.match(/window\.gwps\s*=\s*\{[\s\S]*?\};/);
const gwpsScript = gwpsMatch ? `<script>\n${gwpsMatch[0]}\n</script>` : '';

// 6. Get window.refillData
const refillMatch = srcHtml.match(/window\.refillData\s*=\s*\{[\s\S]*?\};/);
const refillScript = refillMatch ? `<script>\n${refillMatch[0]}\n</script>` : '';

// 7. Get data-product-cards script
const productCardsMatch = srcHtml.match(/<script[^>]*data-product-cards[^>]*>[\s\S]*?<\/script>/i);
const productCardsScript = productCardsMatch ? productCardsMatch[0] : '';

// 8. SVG star symbols
const svgSymbolsMatch = srcHtml.match(/<svg[^>]*style="display:\s*none;"[^>]*>[\s\S]*?<\/svg>/i);
const svgSymbols = svgSymbolsMatch ? svgSymbolsMatch[0] : '';

// 9. Reviews CSS variables and styling
const okeStyles = srcHtml.match(/<style id="oke-[^>]*>[\s\S]*?<\/style>/gi) || [];
const okeStylesJoined = okeStyles.join('\n');

// 10. Drop Animation Styling & ScrollTrigger Refresh
const dropStyles = `
<style>
  /* Exact styling for the animated olive oil drop */
  #intro-drop {
    z-index: 100 !important;
    pointer-events: none !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s linear, opacity 0.2s ease;
  }
  #intro-drop svg {
    width: 28px !important;
    height: 52px !important;
    overflow: visible;
    filter: drop-shadow(0 6px 12px rgba(60, 66, 46, 0.45));
  }
  #intro-drop svg path {
    fill: #3C422E !important;
  }
  #intro-drip-1, #intro-drip-2 {
    font-weight: 700 !important;
    color: var(--color-text, #3C422E) !important;
    z-index: 100 !important;
    font-size: 15px !important;
  }
  .pin-spacer {
    z-index: 90 !important;
  }
</style>
`;

// 11. Mock Shopify Cart & ScrollTrigger refresher
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

    function refreshScroll() {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh(true);
      }
    }

    window.addEventListener('DOMContentLoaded', function() {
      setTimeout(function() {
        document.body.classList.remove('overlay-active');
        refreshScroll();
      }, 500);
      setTimeout(refreshScroll, 1200);
    });

    window.addEventListener('load', function() {
      setTimeout(refreshScroll, 300);
      setTimeout(refreshScroll, 1500);
    });
  })();
</script>
`;

let fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Real Olive Oil Squeeze Bottles – Graza</title>
  <link rel="icon" type="image/png" sizes="32x32" href="https://www.graza.co/cdn/shop/t/38/assets/favicon-32x32.static_small.png?v=97222300656985941251682500131">
  <link rel="icon" type="image/png" sizes="16x16" href="https://www.graza.co/cdn/shop/t/38/assets/favicon-16x16.static_small.png?v=137613868103863135591682500131">

  <script>
    (function () {
      try {
        var stored = localStorage.getItem('graza-pause-motion');
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (stored === 'true' || (stored === null && reduce)) {
          document.documentElement.classList.add('pause-motion');
        }
      } catch (e) {}
    })();
  </script>

  <!-- Exact Fonts -->
  <link rel="stylesheet" href="/assets/fonts.static.css">
  
  <!-- Exact Stylesheet -->
  <link rel="stylesheet" href="/assets/bundle.css">

  ${colorStyle}
  ${okeStylesJoined}
  ${svgSymbols}
  ${dropStyles}
</head>
${bodyTag}
  ${domContent}

  ${productCardsScript}
  ${setHeightScript}
  ${gwpsScript}
  ${refillScript}
  ${cartMockScript}

  <!-- Polyfills & Libraries -->
  <script src="/assets/js-polyfill-smooth-scroll.static.js"></script>
  <script src="/assets/lottie-player.js"></script>

  <!-- Exact Graza Bundle & Index Scripts -->
  <script src="/assets/bundle.js"></script>
  <script src="/assets/js-index.static.js"></script>
</body>
</html>
`;

fullHtml = fullHtml.replace(/\/\/www\.graza\.co\//g, 'https://www.graza.co/');
fullHtml = fullHtml.replace(/\/\/cdn\.shopify\.com\//g, 'https://cdn.shopify.com/');
fullHtml = fullHtml.replace(/https:\/\/www\.graza\.co\/cdn\/shop\/files\/graza-fun-fact\.json[^"']*/g, '/assets/graza-fun-fact.json');

fs.writeFileSync('index.html', fullHtml, 'utf8');
console.log('Successfully re-generated index.html! Length:', fullHtml.length);
