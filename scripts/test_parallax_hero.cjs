const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const { heroHTML } = require('./build_creative_hero.cjs');

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SRSTI - 5 Layer Parallax Hero</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #FAF8F5;
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
    }
    /* Simulated header */
    #header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
      background: rgba(250, 248, 245, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(25, 35, 20, 0.08);
    }
    #header .logo {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #192314;
      text-decoration: none;
    }
    #header .nav-links {
      display: flex;
      gap: 28px;
    }
    #header .nav-links a {
      color: #192314;
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    /* Dummy Section after Hero to test transition */
    .dummy-next-section {
      position: relative;
      background: #192314;
      color: #FAF8F5;
      padding: 100px 40px;
      text-align: center;
      z-index: 30;
    }
    .dummy-next-section h2 {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div id="header">
    <a href="/" class="logo">SRSTI</a>
    <div class="nav-links">
      <a href="#">SHOP</a>
      <a href="#">SIZZLE</a>
      <a href="#">DRIZZLE</a>
      <a href="#">SETS</a>
      <a href="#">ABOUT</a>
    </div>
    <div style="font-size: 13px; font-weight: 800; color: #192314;">CART (0)</div>
  </div>

  <div id="shopify-section-template--16889120686294__hero_b6MgCY" class="shopify-section hero__section">
    ${heroHTML}
  </div>

  <div class="dummy-next-section" id="shopify-section-template--16889120686294__announcement_bar_pTYkYK">
    <h2>Fresh Olive Oil Makes Everything Better</h2>
    <p>Cold-pressed from 100% Picual Olives in Jaén, Spain.</p>
  </div>
</body>
</html>`;

fs.writeFileSync('hero_test.html', fullHtml);
console.log('Written hero_test.html');
