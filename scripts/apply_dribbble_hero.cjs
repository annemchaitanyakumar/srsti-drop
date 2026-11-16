const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const s3Start = '<div id="shopify-section-template--16889120686294__hero_b6MgCY"';
const s4Start = '<div id="shopify-section-template--16889120686294__announcement_bar_pTYkYK"';

const s3Idx = indexHtml.indexOf(s3Start);
const s4Idx = indexHtml.indexOf(s4Start);

if (s3Idx === -1 || s4Idx === -1) {
  console.error('ERROR: Could not locate Section 3 or Section 4 boundaries!');
  process.exit(1);
}

const beforeHero = indexHtml.substring(0, s3Idx);
const afterHero = indexHtml.substring(s4Idx);

const newHeroSection = `<div id="shopify-section-template--16889120686294__hero_b6MgCY" class="shopify-section hero__section">
<!-- Editorial Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
  :root {
    --bg-cream: #FAF8F5;
    --text-dark: #1F2718;
    --text-muted: #5C6752;
    --brand-olive: #24301C;
    --brand-gold: #E5B824;
    --brand-lime: #D1E030;
  }

  /* Header Brand Contrast against warm canvas */
  #header, #header a, #header span, #header button, #header .nav-item {
    color: #1F2718 !important;
  }
  #header svg {
    stroke: #1F2718 !important;
  }
  #header svg path, #header svg line, #header svg polyline, #header svg circle {
    stroke: #1F2718 !important;
  }
  #header .logo svg path, #header .logo path, #header .logo text {
    fill: #1F2718 !important;
  }

  /* Fixed Top Dropdown Switcher Navigation */
  .srsti-nav-switcher-bar {
    position: fixed;
    top: 76px;
    right: 28px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1.5px solid rgba(31, 39, 24, 0.16);
    border-radius: 9999px;
    padding: 6px 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
    pointer-events: auto;
  }
  .srsti-switcher-label {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3C472E;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .srsti-switcher-label .star {
    color: var(--brand-gold);
  }
  .srsti-switcher-select {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--text-dark);
    background: #F2EDE4;
    border: 1px solid rgba(31, 39, 24, 0.16);
    border-radius: 9999px;
    padding: 6px 30px 6px 14px;
    cursor: pointer;
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231F2718' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    transition: all 0.2s ease;
  }
  .srsti-switcher-select:hover {
    background-color: #E7E0D3;
  }

  /* Master Hero Container */
  .srsti-dribbble-hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 100px;
    padding-bottom: 30px;
    overflow: hidden;
    background: radial-gradient(circle 950px at 50% 32%, #FFFFFF 0%, #FAF8F5 60%, #F3EDE4 100%);
    box-sizing: border-box;
  }

  /* Ambient Warm Glow */
  .srsti-center-glow {
    position: absolute;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    height: 580px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(229, 184, 36, 0.2) 0%, rgba(209, 224, 48, 0.1) 40%, transparent 72%);
    pointer-events: none;
    z-index: 1;
  }

  /* Header Typography Stack */
  .srsti-hero-header-stack {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 860px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Eyebrow Pill */
  .srsti-estate-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #3C422E;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(60, 66, 46, 0.2);
    border-radius: 9999px;
    padding: 5px 16px;
    margin-bottom: 18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
  .srsti-estate-pill .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--brand-gold);
  }

  /* Editorial Headline */
  .srsti-hero-main-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5.2vw, 74px);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #1F2718;
    margin-bottom: 14px;
  }

  /* Subtitle */
  .srsti-hero-subtitle {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.6;
    color: #555E4C;
    max-width: 620px;
    margin-bottom: 24px;
  }

  /* Dual Buttons */
  .srsti-hero-btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
  .srsti-btn-outline-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: #1F2718;
    background: rgba(255, 255, 255, 0.75);
    border: 1.5px solid rgba(31, 39, 24, 0.25);
    border-radius: 9999px;
    padding: 11px 22px;
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .srsti-btn-outline-pill:hover {
    background: #FFFFFF;
    border-color: #1F2718;
    transform: translateY(-2px);
  }
  .srsti-btn-dark-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    color: #FAF8F5;
    background: #1C2717;
    border: 1.5px solid #1C2717;
    border-radius: 9999px;
    padding: 11px 24px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(28, 39, 23, 0.25);
    transition: all 0.25s ease;
  }
  .srsti-btn-dark-pill:hover {
    background: #2D3D25;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(28, 39, 23, 0.35);
  }
  .srsti-btn-dark-pill svg {
    transition: transform 0.2s ease;
  }
  .srsti-btn-dark-pill:hover svg {
    transform: translateX(3px);
  }

  /* Center Stage */
  .srsti-center-stage {
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 960px;
    height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
  }

  /* Hero Views */
  .srsti-hero-view {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.96);
  }
  .srsti-hero-view.active {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
  }

  /* Floater Keyframes */
  @keyframes floatVessel {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes floatLeaf1 {
    0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
    50% { transform: translate(-8px, -14px) rotate(5deg); }
  }
  @keyframes floatLeaf2 {
    0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
    50% { transform: translate(10px, -12px) rotate(-6deg); }
  }
  @keyframes rippleWave {
    0% { r: 5px; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 38px; opacity: 0; stroke-width: 0.5; }
  }

  /* Floating Spec Pills */
  .srsti-spec-pill {
    position: absolute;
    z-index: 15;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #2D3624;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(60, 66, 46, 0.16);
    border-radius: 9999px;
    padding: 7px 16px;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease;
    white-space: nowrap;
  }
  .srsti-spec-pill:hover {
    transform: scale(1.06);
  }

  /* Floating Leaves and Olives */
  .srsti-leaf {
    position: absolute;
    pointer-events: none;
    z-index: 8;
    filter: drop-shadow(0 6px 12px rgba(35, 45, 25, 0.18));
    transition: transform 0.15s ease-out;
  }

  /* =========================================================
     HERO 1: ARTISAN CERAMIC TASTING BOWL & CONTINUOUS STREAM
     ========================================================= */
  .srsti-vessel-wrap {
    position: relative;
    width: 440px;
    height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: floatVessel 6s ease-in-out infinite;
  }

  .srsti-pour-stream-hero1 {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 275px;
    z-index: 7;
    pointer-events: none;
  }

  /* Animated Concentric Ripple in Cup */
  .ripple-ring {
    animation: rippleWave 2.8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
    transform-origin: 140px 86px;
  }
  .ripple-ring:nth-child(2) {
    animation-delay: 1.4s;
  }

  /* =========================================================
     HERO 2: SQUEEZE BOTTLE & CUP CASCADE DUO
     ========================================================= */
  .srsti-duo-stage {
    position: relative;
    width: 860px;
    height: 480px;
    animation: floatVessel 6.5s ease-in-out infinite;
  }

  /* Tilted Squeeze Bottle Pouring into Cup */
  .srsti-duo-bottle {
    position: absolute;
    top: -20px;
    left: 80px;
    width: 250px;
    height: 460px;
    transform: rotate(126deg);
    filter: drop-shadow(-15px 22px 28px rgba(25, 35, 18, 0.24));
    z-index: 10;
  }
  .srsti-duo-bottle img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Golden Stream Connecting Nozzle Directly to Cup */
  .srsti-duo-stream {
    position: absolute;
    top: 0;
    left: 0;
    width: 860px;
    height: 480px;
    z-index: 12;
    pointer-events: none;
  }

  /* Ceramic Cup on the Right */
  .srsti-duo-cup {
    position: absolute;
    bottom: 30px;
    left: 450px;
    width: 280px;
    height: 240px;
    z-index: 5;
  }

  /* Bottom Natural Organic Terrain Mound */
  .srsti-bottom-terrain {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 140px;
    z-index: 3;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  /* Bottom Floating Feature Pill Bar */
  .srsti-bottom-feature-bar {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;
    display: flex;
    align-items: center;
    gap: 24px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(31, 39, 24, 0.12);
    border-radius: 9999px;
    padding: 10px 26px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  }
  .srsti-feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #2D3624;
    white-space: nowrap;
  }
  .srsti-feature-item svg {
    color: var(--brand-gold);
  }
  .srsti-feature-divider {
    width: 1px;
    height: 14px;
    background: rgba(31, 39, 24, 0.16);
  }

  @media (max-width: 900px) {
    .srsti-nav-switcher-bar {
      position: relative;
      top: 0;
      right: 0;
      margin: 8px auto 14px auto;
      width: 94%;
      max-width: 350px;
      padding: 4px 10px;
      box-sizing: border-box;
      justify-content: space-between;
    }
    .srsti-switcher-label {
      font-size: 10px;
      white-space: nowrap;
    }
    .srsti-switcher-select {
      font-size: 11px;
      padding: 4px 22px 4px 8px;
      max-width: 220px;
      text-overflow: ellipsis;
    }
    .srsti-dribbble-hero {
      padding-top: 60px;
    }
    .srsti-hero-main-title {
      font-size: clamp(26px, 7.2vw, 38px);
      line-height: 1.15;
    }
    .srsti-hero-subtitle {
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .srsti-hero-btn-group {
      flex-direction: row;
      gap: 10px;
    }
    .srsti-btn-outline-pill, .srsti-btn-dark-pill {
      font-size: 12px;
      padding: 9px 16px;
    }
    .srsti-center-stage {
      height: 360px;
      margin-top: 10px;
    }
    .srsti-vessel-wrap {
      transform: scale(0.82);
    }
    .srsti-duo-stage {
      transform: scale(0.68);
      transform-origin: center center;
    }
    .srsti-bottom-feature-bar {
      bottom: 12px;
      gap: 8px;
      padding: 6px 12px;
      max-width: 94%;
    }
    .srsti-feature-item {
      font-size: 9.5px;
    }
  }
</style>

<!-- Master Hero Section -->
<section class="srsti-dribbble-hero" id="heroSection">
  <!-- Top Floating Dropdown Nav Switcher -->
  <div class="srsti-nav-switcher-bar">
    <div class="srsti-switcher-label">
      <span class="star">✦</span>
      <span>HERO STYLE:</span>
    </div>
    <select id="heroSelect" class="srsti-switcher-select">
      <option value="hero-1" selected>Hero 1: Tasting Cup &amp; Liquid Gold (Exact Video Match)</option>
      <option value="hero-2">Hero 2: Squeeze Bottle &amp; Cup Pour Duo</option>
    </select>
  </div>

  <!-- Ambient Radial Glow -->
  <div class="srsti-center-glow"></div>

  <!-- Centered Header Typography Stack -->
  <div class="srsti-hero-header-stack">
    <!-- Eyebrow Pill -->
    <div class="srsti-estate-pill">
      <span class="dot"></span>
      <span>SINGLE ESTATE • JAÉN, ANDALUSIA</span>
    </div>

    <!-- Main Title -->
    <h1 class="srsti-hero-main-title">
      Extra Virgin Olive Oil, <br>
      <span style="font-style: italic; font-weight: 400; color: #2D3924;">Pressed Above the Groves</span>
    </h1>

    <!-- Subtitle -->
    <p class="srsti-hero-subtitle">
      A single-estate extra virgin olive oil from one family grove in Jaén, Spain — grassy, peppery and naturally rich, picked at early maturity and cold-pressed within 24 hours of harvest.
    </p>

    <!-- Dual CTAs -->
    <div class="srsti-hero-btn-group">
      <a href="/pages/about-us" class="srsti-btn-outline-pill">
        <span>Book a Tasting</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </a>
      <a href="/collections/all" class="srsti-btn-dark-pill">
        <span>Shop the Harvest</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </div>

  <!-- Centerpiece Stage -->
  <div class="srsti-center-stage" id="centerStage">

    <!-- ========================================================
         HERO 1: ARTISAN CERAMIC TASTING CUP & LIQUID GOLD (1:1)
         ======================================================== -->
    <div class="srsti-hero-view active" id="view-hero-1">
      <div class="srsti-vessel-wrap">
        
        <!-- Flowing Liquid Gold Stream (Luminous & Defined) -->
        <svg class="srsti-pour-stream-hero1" viewBox="0 0 24 280" fill="none">
          <defs>
            <linearGradient id="streamGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#E5BA23"/>
              <stop offset="35%" stop-color="#E8BE29"/>
              <stop offset="70%" stop-color="#D7CA2B"/>
              <stop offset="100%" stop-color="#A5C622"/>
            </linearGradient>
            <linearGradient id="streamShine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
              <stop offset="60%" stop-color="#FFFAD0" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="transparent"/>
            </linearGradient>
          </defs>
          <!-- Glowing Outer Halo -->
          <path d="M 12,0 L 12,250" stroke="#FFDF60" stroke-width="8" stroke-linecap="round" opacity="0.35"/>
          <!-- Main Golden Stream Core -->
          <path d="M 12,0 L 12,250" stroke="url(#streamGrad1)" stroke-width="6.5" stroke-linecap="round"/>
          <!-- Specular Liquid Highlight Streak -->
          <path d="M 11,0 L 11,250" stroke="url(#streamShine)" stroke-width="2" stroke-linecap="round"/>
        </svg>

        <!-- The Artisan Ceramic Cup / Tasting Bowl -->
        <svg width="280" height="235" viewBox="0 0 280 240" fill="none" style="filter: drop-shadow(0 26px 38px rgba(35,46,26,0.24));">
          <defs>
            <radialGradient id="cupClay" cx="45%" cy="38%" r="62%">
              <stop offset="0%" stop-color="#FDFBF7"/>
              <stop offset="60%" stop-color="#ECE3D2"/>
              <stop offset="90%" stop-color="#CEBFA6"/>
              <stop offset="100%" stop-color="#B8A78C"/>
            </radialGradient>
            <linearGradient id="cupRimHighlight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#B5A488" stop-opacity="0.4"/>
            </linearGradient>
            <!-- Liquid Olive Oil Surface Gradient (Jaén Gold) -->
            <radialGradient id="oilPool" cx="42%" cy="45%" r="56%">
              <stop offset="0%" stop-color="#FFF280"/>
              <stop offset="30%" stop-color="#E8BE23"/>
              <stop offset="70%" stop-color="#BACD26"/>
              <stop offset="100%" stop-color="#7B9214"/>
            </radialGradient>
            <!-- Surface Glaze Highlight Arc -->
            <linearGradient id="oilSheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
              <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="transparent"/>
            </linearGradient>
          </defs>

          <!-- Ceramic Cup Outer Body -->
          <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 C 215,96 65,96 40,85 Z" fill="url(#cupClay)" stroke="#B8A78C" stroke-width="1.8"/>
          
          <!-- Cup Rim Outer Ellipse -->
          <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="url(#cupRimHighlight)" stroke-width="2.5"/>

          <!-- Pool of Golden Olive Oil -->
          <ellipse cx="140" cy="86" rx="92" ry="32" fill="url(#oilPool)"/>

          <!-- Liquid Oil Caustics & Reflection Rings -->
          <ellipse cx="140" cy="86" rx="72" ry="23" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
          <ellipse cx="140" cy="86" rx="46" ry="14" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
          
          <!-- Expanding Impact Ripples -->
          <circle cx="140" cy="86" r="14" fill="none" stroke="rgba(255,248,180,0.8)" stroke-width="2" class="ripple-ring"/>
          <circle cx="140" cy="86" r="26" fill="none" stroke="rgba(255,248,180,0.5)" stroke-width="1.5" class="ripple-ring"/>

          <!-- Surface Specular Light Arc -->
          <path d="M 75,76 Q 140,96 205,76" stroke="url(#oilSheen)" stroke-width="4.5" stroke-linecap="round"/>

          <!-- Impact Point Flare -->
          <circle cx="140" cy="86" r="5" fill="#FFFFFF"/>
          <circle cx="140" cy="86" r="8" fill="#FFF490" opacity="0.6"/>
        </svg>

        <!-- 3 Floating Spec Badges -->
        <div class="srsti-spec-pill" style="top: 24%; left: -15px;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2D3624" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Cold-Pressed &lt; 24h</span>
        </div>

        <div class="srsti-spec-pill" style="top: 35%; right: -32px;">
          <span style="color:#C69F1B; font-weight:800;">✦</span>
          <span>Acidity &le; 0.2%</span>
        </div>

        <div class="srsti-spec-pill" style="bottom: 22%; left: 10px; background:#F8F4EA;">
          <span>100% Picual Olives</span>
        </div>

        <!-- Orbiting Spanish Olive Leaves & Olives -->
        <svg class="srsti-leaf" style="top: 10%; left: 14%; width: 52px; animation: floatLeaf1 7s ease-in-out infinite;" viewBox="0 0 60 70" fill="none">
          <path d="M 10,65 Q 25,30 55,5 Q 40,40 10,65 Z" fill="#6A8042"/>
          <path d="M 10,65 Q 32,35 55,5" stroke="#90A862" stroke-width="1.5"/>
        </svg>

        <svg class="srsti-leaf" style="top: 20%; right: 10%; width: 46px; animation: floatLeaf2 8s ease-in-out infinite;" viewBox="0 0 60 70" fill="none">
          <path d="M 5,10 Q 35,25 55,65 Q 25,45 5,10 Z" fill="#586E36"/>
          <path d="M 5,10 Q 30,38 55,65" stroke="#839B54" stroke-width="1.5"/>
        </svg>

        <svg class="srsti-leaf" style="bottom: 22%; right: 4%; width: 62px; animation: floatLeaf1 6.5s ease-in-out infinite;" viewBox="0 0 70 80" fill="none">
          <path d="M 65,10 Q 35,45 10,75 Q 45,55 65,10 Z" fill="#758E4A"/>
          <path d="M 65,10 Q 38,45 10,75" stroke="#9BB86A" stroke-width="1.5"/>
        </svg>

        <svg class="srsti-leaf" style="bottom: 12%; left: 10%; width: 48px; animation: floatLeaf2 7.5s ease-in-out infinite;" viewBox="0 0 60 70" fill="none">
          <path d="M 55,70 Q 35,35 5,10 Q 25,45 55,70 Z" fill="#4E6330"/>
          <path d="M 55,70 Q 30,38 5,10" stroke="#779050" stroke-width="1.5"/>
        </svg>

        <svg class="srsti-leaf" style="bottom: 30%; right: 16%; width: 28px;" viewBox="0 0 32 38" fill="none">
          <ellipse cx="16" cy="19" rx="14" ry="17" fill="#7E9646"/>
          <ellipse cx="12" cy="14" rx="4" ry="7" fill="#A4BE68" opacity="0.75"/>
        </svg>

        <svg class="srsti-leaf" style="top: 40%; left: 20%; width: 24px;" viewBox="0 0 32 38" fill="none">
          <ellipse cx="16" cy="19" rx="13" ry="16" fill="#88A34A"/>
          <ellipse cx="13" cy="13" rx="3.5" ry="6" fill="#BFDC7F" opacity="0.8"/>
        </svg>
      </div>
    </div>

    <!-- ========================================================
         HERO 2: SQUEEZE BOTTLE & CUP CASCADE DUO
         ======================================================== -->
    <div class="srsti-hero-view" id="view-hero-2">
      <div class="srsti-duo-stage">
        
        <!-- Tilted Squeeze Bottle Pouring into Cup -->
        <div class="srsti-duo-bottle">
          <img src="/assets/images/bottle_1.png" alt="SRSTI Drizzle Squeeze Bottle" />
        </div>

        <!-- Golden Stream Connecting Nozzle Directly to Cup -->
        <svg class="srsti-duo-stream" viewBox="0 0 860 480" fill="none">
          <defs>
            <linearGradient id="streamGold2" x1="275" y1="260" x2="590" y2="296" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#E5BA23"/>
              <stop offset="50%" stop-color="#E8BE29"/>
              <stop offset="85%" stop-color="#D7CA2B"/>
              <stop offset="100%" stop-color="#BACD26"/>
            </linearGradient>
            <linearGradient id="streamHighlight2" x1="275" y1="260" x2="590" y2="296" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
              <stop offset="50%" stop-color="#FFFAD0" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="transparent"/>
            </linearGradient>
          </defs>
          <!-- Glow halo -->
          <path d="M 275,260 Q 430,272 590,296" stroke="#FFDF60" stroke-width="8" opacity="0.35" stroke-linecap="round"/>
          <!-- Core stream -->
          <path d="M 275,260 Q 430,272 590,296" stroke="url(#streamGold2)" stroke-width="6" stroke-linecap="round"/>
          <!-- Specular Highlight -->
          <path d="M 275,260 Q 430,272 590,296" stroke="url(#streamHighlight2)" stroke-width="2" stroke-linecap="round"/>
        </svg>

        <!-- Ceramic Cup Receiving the Gold Stream -->
        <div class="srsti-duo-cup">
          <svg width="280" height="240" viewBox="0 0 280 240" fill="none" style="filter: drop-shadow(0 24px 35px rgba(35,46,26,0.22));">
            <!-- Ceramic Cup Outer Body -->
            <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 C 215,96 65,96 40,85 Z" fill="url(#cupClay)" stroke="#B8A78C" stroke-width="1.8"/>
            
            <!-- Cup Rim Outer Ellipse -->
            <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="url(#cupRimHighlight)" stroke-width="2.5"/>

            <!-- Pool of Golden Olive Oil -->
            <ellipse cx="140" cy="86" rx="92" ry="32" fill="url(#oilPool)"/>

            <!-- Caustics & Reflection Rings -->
            <ellipse cx="140" cy="86" rx="72" ry="23" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
            
            <!-- Expanding Impact Ripples -->
            <circle cx="140" cy="86" r="14" fill="none" stroke="rgba(255,248,180,0.8)" stroke-width="2" class="ripple-ring"/>
            <circle cx="140" cy="86" r="26" fill="none" stroke="rgba(255,248,180,0.5)" stroke-width="1.5" class="ripple-ring"/>

            <!-- Surface Specular Light Arc -->
            <path d="M 75,76 Q 140,96 205,76" stroke="url(#oilSheen)" stroke-width="4.5" stroke-linecap="round"/>

            <!-- Impact Point Flare -->
            <circle cx="140" cy="86" r="5" fill="#FFFFFF"/>
            <circle cx="140" cy="86" r="8" fill="#FFF490" opacity="0.6"/>
          </svg>
        </div>

        <!-- Spec Pills for Hero 2 -->
        <div class="srsti-spec-pill" style="top: 20px; left: 50px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D3624" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Chef Squeeze Nozzle</span>
        </div>

        <div class="srsti-spec-pill" style="top: 40px; right: 60px;">
          <span style="color:#C69F1B; font-weight:800;">✦</span>
          <span>Cold-Pressed &lt; 24h</span>
        </div>

        <div class="srsti-spec-pill" style="bottom: 35px; left: 140px; background:#F8F4EA;">
          <span>100% Spanish Picual</span>
        </div>

        <!-- Orbiting Leaves & Olives -->
        <svg class="srsti-leaf" style="top: 25px; right: 350px; width: 48px; animation: floatLeaf1 7s ease-in-out infinite;" viewBox="0 0 60 70" fill="none">
          <path d="M 10,65 Q 25,30 55,5 Q 40,40 10,65 Z" fill="#6A8042"/>
        </svg>
        <svg class="srsti-leaf" style="bottom: 60px; right: 60px; width: 56px; animation: floatLeaf2 8s ease-in-out infinite;" viewBox="0 0 70 80" fill="none">
          <path d="M 65,10 Q 35,45 10,75 Q 45,55 65,10 Z" fill="#758E4A"/>
        </svg>
        <svg class="srsti-leaf" style="top: 120px; right: 140px; width: 26px;" viewBox="0 0 32 38" fill="none">
          <ellipse cx="16" cy="19" rx="14" ry="17" fill="#7E9646"/>
          <ellipse cx="12" cy="14" rx="4" ry="7" fill="#A4BE68" opacity="0.75"/>
        </svg>
      </div>
    </div>

  </div>

  <!-- Bottom Natural Organic Terrain Mound (Lush Green Moss/Olive Grove Terrain) -->
  <div class="srsti-bottom-terrain">
    <svg width="100%" height="130" viewBox="0 0 1440 130" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="terrainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4B5E32"/>
          <stop offset="45%" stop-color="#374722"/>
          <stop offset="100%" stop-color="#263316"/>
        </linearGradient>
      </defs>
      <!-- Layered Organic Landscape Curves -->
      <path d="M 0,130 L 0,65 Q 180,25 380,48 Q 580,70 760,35 Q 940,5 1140,42 Q 1320,72 1440,50 L 1440,130 Z" fill="url(#terrainGrad)"/>
      <path d="M 0,130 L 0,80 Q 220,50 440,65 Q 660,80 880,55 Q 1100,30 1320,60 L 1440,75 L 1440,130 Z" fill="#2E3C1B" opacity="0.85"/>
    </svg>
  </div>

  <!-- Bottom Floating Feature Pill Bar -->
  <div class="srsti-bottom-feature-bar">
    <div class="srsti-feature-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>First Cold Press &lt; 24h</span>
    </div>
    <div class="srsti-feature-divider"></div>
    <div class="srsti-feature-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>100% Single Origin</span>
    </div>
    <div class="srsti-feature-divider"></div>
    <div class="srsti-feature-item">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Estate Bottled in Spain</span>
    </div>
  </div>
</section>

<!-- Switcher & 3D Cursor Parallax Scripts -->
<script>
  (function() {
    const heroSelect = document.getElementById('heroSelect');
    const view1 = document.getElementById('view-hero-1');
    const view2 = document.getElementById('view-hero-2');

    function switchHero(val) {
      if (val === 'hero-1') {
        view1.classList.add('active');
        view2.classList.remove('active');
      } else {
        view2.classList.add('active');
        view1.classList.remove('active');
      }
      try {
        localStorage.setItem('srsti_hero_preference', val);
      } catch(e) {}
    }

    // Check URL param or saved choice
    const urlParams = new URLSearchParams(window.location.search);
    const saved = urlParams.get('hero') || localStorage.getItem('srsti_hero_preference');
    if (saved && (saved === 'hero-1' || saved === 'hero-2')) {
      heroSelect.value = saved;
      switchHero(saved);
    }

    heroSelect.addEventListener('change', (e) => {
      switchHero(e.target.value);
    });

    // 3D Parallax on Mouse Movement (Just like OOLO video)
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      const leaves = document.querySelectorAll('.srsti-leaf');
      leaves.forEach((leaf, i) => {
        const factor = (i + 1) * 7;
        leaf.style.transform = 'translate(' + (dx * factor) + 'px, ' + (dy * factor) + 'px)';
      });

      const pills = document.querySelectorAll('.srsti-spec-pill');
      pills.forEach((pill, i) => {
        const factor = (i + 1) * 4;
        pill.style.transform = 'translate(' + (dx * factor) + 'px, ' + (dy * factor) + 'px)';
      });
    });
  })();
</script>
</div>
`;

const updatedIndex = beforeHero + newHeroSection + afterHero;
fs.writeFileSync('index.html', updatedIndex, 'utf8');
console.log('Successfully applied refined Dribbble hero section to index.html!');
