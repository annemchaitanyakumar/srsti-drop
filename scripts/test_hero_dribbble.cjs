const fs = require('fs');
const path = require('path');

// We will build a complete test HTML page `hero_test.html` and inspect it via Chrome screenshot!
const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hero Comparison Test - SRSTI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-cream: #FBF9F5;
      --text-dark: #1F2718;
      --text-muted: #5C6752;
      --brand-olive: #24301C;
      --brand-gold: #E5B824;
      --brand-lime: #D1E030;
      --brand-accent: #9EEF80;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-cream);
      color: var(--text-dark);
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
      min-height: 100vh;
    }

    /* Top Dropdown Switcher Navigation Bar */
    .srsti-nav-switcher-bar {
      position: fixed;
      top: 18px;
      right: 28px;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1.5px solid rgba(31, 39, 24, 0.15);
      border-radius: 9999px;
      padding: 6px 14px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
    }
    .srsti-switcher-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .srsti-switcher-select {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-dark);
      background: #F1ECE3;
      border: 1px solid rgba(31, 39, 24, 0.15);
      border-radius: 9999px;
      padding: 5px 28px 5px 12px;
      cursor: pointer;
      outline: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231F2718' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      transition: all 0.2s ease;
    }
    .srsti-switcher-select:hover {
      background-color: #E8E2D7;
    }

    /* Hero Section Master Container */
    .srsti-dribbble-hero {
      position: relative;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 54px;
      padding-bottom: 30px;
      overflow: hidden;
      background: radial-gradient(circle 900px at 50% 30%, #FFFFFF 0%, #FAF8F4 65%, #F4EFE6 100%);
    }

    /* Ambient Subtle Glow Behind Centerpiece */
    .srsti-center-glow {
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 560px;
      height: 560px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(229, 184, 36, 0.18) 0%, rgba(209, 224, 48, 0.08) 45%, transparent 70%);
      pointer-events: none;
      z-index: 1;
    }

    /* Top Typography Stack (Centered, Just like OOLO video) */
    .srsti-hero-header-stack {
      position: relative;
      z-index: 10;
      text-align: center;
      max-width: 820px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Eyebrow Pill Tag */
    .srsti-estate-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #3C422E;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(60, 66, 46, 0.22);
      border-radius: 9999px;
      padding: 5px 16px;
      margin-bottom: 18px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .srsti-estate-pill .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--brand-gold);
    }

    /* Master Headline in Editorial Serif */
    .srsti-hero-main-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(42px, 5.2vw, 76px);
      font-weight: 500;
      line-height: 1.08;
      letter-spacing: -0.02em;
      color: #1F2718;
      margin-bottom: 14px;
    }

    /* Subtitle Lead Paragraph */
    .srsti-hero-subtitle {
      font-size: clamp(14px, 1.2vw, 16px);
      line-height: 1.6;
      color: #555E4C;
      max-width: 620px;
      margin-bottom: 24px;
    }

    /* Dual Centered CTAs */
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
      font-size: 13px;
      font-weight: 600;
      color: #1F2718;
      background: rgba(255, 255, 255, 0.7);
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
      font-size: 13px;
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

    /* Center Stage Showcase (Floating Vessel & Liquid) */
    .srsti-center-stage {
      position: relative;
      z-index: 5;
      width: 100%;
      max-width: 960px;
      height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -15px;
    }

    /* Container for Option 1 and Option 2 */
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

    /* Floating Levitation Animation */
    @keyframes floatVessel {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-1deg); }
    }
    @keyframes floatLeaf1 {
      0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
      50% { transform: translate(-6px, -12px) rotate(4deg); }
    }
    @keyframes floatLeaf2 {
      0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
      50% { transform: translate(8px, -10px) rotate(-5deg); }
    }
    @keyframes streamFlow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: 40; }
    }

    /* ----------------------------------------------------
       HERO 1: ARTISAN CERAMIC TASTING BOWL & LIQUID GOLD
       ---------------------------------------------------- */
    .srsti-vessel-wrap {
      position: relative;
      width: 440px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: floatVessel 6s ease-in-out infinite;
    }

    /* Continuous Golden Olive Oil Pour Stream */
    .srsti-pour-stream {
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 18px;
      height: 250px;
      z-index: 6;
      pointer-events: none;
    }

    /* Floating Spec Pills Around Vessel */
    .srsti-spec-pill {
      position: absolute;
      z-index: 12;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: #2D3624;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(60, 66, 46, 0.15);
      border-radius: 9999px;
      padding: 6px 14px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
      transition: transform 0.25s ease;
      white-space: nowrap;
    }
    .srsti-spec-pill:hover {
      transform: scale(1.06);
    }
    .pill-harvest {
      top: 25%;
      left: -10px;
    }
    .pill-acidity {
      top: 36%;
      right: -30px;
    }
    .pill-varietal {
      bottom: 22%;
      left: 15px;
      background: #F8F3E6;
    }

    /* Floating Parallax Olive Leaves & Olives */
    .srsti-leaf {
      position: absolute;
      pointer-events: none;
      z-index: 8;
      filter: drop-shadow(0 6px 10px rgba(35, 45, 25, 0.15));
      transition: transform 0.15s ease-out;
    }
    .leaf-1 { top: 12%; left: 15%; width: 52px; animation: floatLeaf1 7s ease-in-out infinite; }
    .leaf-2 { top: 22%; right: 12%; width: 44px; animation: floatLeaf2 8s ease-in-out infinite; }
    .leaf-3 { bottom: 25%; right: 5%; width: 62px; animation: floatLeaf1 6.5s ease-in-out infinite; }
    .leaf-4 { bottom: 15%; left: 10%; width: 48px; animation: floatLeaf2 7.5s ease-in-out infinite; }
    .leaf-5 { top: -20px; left: 45%; width: 38px; animation: floatLeaf1 9s ease-in-out infinite; }
    .olive-1 { bottom: 32%; right: 18%; width: 26px; }
    .olive-2 { top: 38%; left: 22%; width: 22px; }

    /* ----------------------------------------------------
       HERO 2: SQUEEZE BOTTLE POURING INTO CERAMIC CUP
       ---------------------------------------------------- */
    .srsti-bottle-pour-wrap {
      position: relative;
      width: 500px;
      height: 440px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: floatVessel 6.5s ease-in-out infinite;
    }
    .srsti-floating-pour-bottle {
      position: absolute;
      top: -35px;
      left: 45px;
      width: 200px;
      height: 320px;
      transform: rotate(-32deg);
      z-index: 10;
      filter: drop-shadow(0 20px 30px rgba(25, 35, 18, 0.25));
    }
    .srsti-floating-pour-bottle img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .srsti-cup-receiver {
      position: absolute;
      bottom: 25px;
      right: 60px;
      width: 260px;
      height: 190px;
      z-index: 5;
    }

    /* Bottom Natural Landscape Terrain Mound */
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
      padding: 9px 24px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
    }
    .srsti-feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11.5px;
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
      background: rgba(31, 39, 24, 0.15);
    }

    @media (max-width: 900px) {
      .srsti-nav-switcher-bar {
        top: 10px;
        right: 12px;
        padding: 4px 10px;
      }
      .srsti-center-stage {
        height: 380px;
      }
      .srsti-bottom-feature-bar {
        bottom: 14px;
        gap: 12px;
        padding: 6px 14px;
      }
      .srsti-feature-item {
        font-size: 10px;
      }
      .pill-harvest { left: 5px; }
      .pill-acidity { right: 5px; }
    }
  </style>
</head>
<body>

  <!-- Top Floating Dropdown Nav Switcher -->
  <div class="srsti-nav-switcher-bar">
    <div class="srsti-switcher-label">
      <span>✦ HERO STYLE:</span>
    </div>
    <select id="heroSelect" class="srsti-switcher-select">
      <option value="hero-1" selected>Hero 1: Tasting Cup &amp; Liquid Gold (Exact Video Match)</option>
      <option value="hero-2">Hero 2: Squeeze Bottle &amp; Cup Pour</option>
    </select>
  </div>

  <!-- Master Hero Section -->
  <section class="srsti-dribbble-hero" id="heroSection">
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
          <!-- Flowing Liquid Gold Stream -->
          <svg class="srsti-pour-stream" viewBox="0 0 40 280" fill="none">
            <defs>
              <linearGradient id="streamGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#E1B72A" stop-opacity="0.2"/>
                <stop offset="25%" stop-color="#EABF2F" stop-opacity="0.95"/>
                <stop offset="70%" stop-color="#D4C82E" stop-opacity="1"/>
                <stop offset="100%" stop-color="#B8CE2C" stop-opacity="1"/>
              </linearGradient>
              <linearGradient id="streamHighlight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
                <stop offset="50%" stop-color="#FFFDF2" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <!-- Core Pouring Stream -->
            <path d="M 18,0 Q 20,120 18,240 Q 20,260 22,275 Q 16,260 18,240 Q 16,120 18,0 Z" fill="url(#streamGrad1)"/>
            <path d="M 19,0 Q 20,120 19,250" stroke="url(#streamHighlight)" stroke-width="2.5" stroke-linecap="round"/>
          </svg>

          <!-- The Artisan Ceramic Cup / Tasting Bowl -->
          <svg width="270" height="230" viewBox="0 0 280 240" fill="none" style="filter: drop-shadow(0 25px 35px rgba(40,48,30,0.22));">
            <defs>
              <radialGradient id="cupClay" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#FDFBF7"/>
                <stop offset="65%" stop-color="#EBE3D3"/>
                <stop offset="100%" stop-color="#CEBFA6"/>
              </radialGradient>
              <linearGradient id="cupRimHighlight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#C5B59A" stop-opacity="0.4"/>
              </linearGradient>
              <!-- Liquid Olive Oil Surface Gradient -->
              <radialGradient id="oilPool" cx="42%" cy="45%" r="55%">
                <stop offset="0%" stop-color="#FBF085"/>
                <stop offset="35%" stop-color="#E2BA26"/>
                <stop offset="75%" stop-color="#BACD28"/>
                <stop offset="100%" stop-color="#849C18"/>
              </radialGradient>
              <!-- Surface Glaze Highlight -->
              <linearGradient id="oilSheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75"/>
                <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="transparent"/>
              </linearGradient>
            </defs>

            <!-- Ceramic Cup Outer Body -->
            <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 C 215,96 65,96 40,85 Z" fill="url(#cupClay)" stroke="#BFAF96" stroke-width="2"/>
            
            <!-- Cup Rim Outer Ellipse -->
            <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="url(#cupRimHighlight)" stroke-width="2.5"/>

            <!-- Pool of Golden Olive Oil -->
            <ellipse cx="140" cy="86" rx="92" ry="32" fill="url(#oilPool)"/>

            <!-- Liquid Oil Caustics & Reflection Rings -->
            <ellipse cx="140" cy="86" rx="75" ry="24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
            <ellipse cx="140" cy="86" rx="45" ry="14" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
            
            <!-- Surface Specular Light Arc -->
            <path d="M 75,76 Q 140,96 205,76" stroke="url(#oilSheen)" stroke-width="4.5" stroke-linecap="round"/>

            <!-- Liquid Splash Impact Drop -->
            <circle cx="140" cy="86" r="5" fill="#FFF7A8" filter="blur(0.5px)"/>
            <circle cx="140" cy="86" r="12" fill="none" stroke="rgba(255,247,168,0.7)" stroke-width="1.5"/>
          </svg>

          <!-- 3 Floating Spec Badges -->
          <div class="srsti-spec-pill pill-harvest">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D3624" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Cold-Pressed &lt; 24h</span>
          </div>

          <div class="srsti-spec-pill pill-acidity">
            <span style="color:#C69F1B; font-weight:800;">✦</span>
            <span>Acidity &le; 0.2%</span>
          </div>

          <div class="srsti-spec-pill pill-varietal">
            <span>100% Picual Olives</span>
          </div>

          <!-- Orbiting Spanish Olive Leaves & Olives -->
          <!-- Leaf 1 (Top Left) -->
          <svg class="srsti-leaf leaf-1" viewBox="0 0 60 70" fill="none">
            <path d="M 10,65 Q 25,30 55,5 Q 40,40 10,65 Z" fill="#6A8042"/>
            <path d="M 10,65 Q 32,35 55,5" stroke="#90A862" stroke-width="1.5"/>
          </svg>

          <!-- Leaf 2 (Top Right) -->
          <svg class="srsti-leaf leaf-2" viewBox="0 0 60 70" fill="none">
            <path d="M 5,10 Q 35,25 55,65 Q 25,45 5,10 Z" fill="#586E36"/>
            <path d="M 5,10 Q 30,38 55,65" stroke="#839B54" stroke-width="1.5"/>
          </svg>

          <!-- Leaf 3 (Bottom Right) -->
          <svg class="srsti-leaf leaf-3" viewBox="0 0 70 80" fill="none">
            <path d="M 65,10 Q 35,45 10,75 Q 45,55 65,10 Z" fill="#758E4A"/>
            <path d="M 65,10 Q 38,45 10,75" stroke="#9BB86A" stroke-width="1.5"/>
          </svg>

          <!-- Leaf 4 (Bottom Left) -->
          <svg class="srsti-leaf leaf-4" viewBox="0 0 60 70" fill="none">
            <path d="M 55,70 Q 35,35 5,10 Q 25,45 55,70 Z" fill="#4E6330"/>
            <path d="M 55,70 Q 30,38 5,10" stroke="#779050" stroke-width="1.5"/>
          </svg>

          <!-- Green Spanish Olive 1 -->
          <svg class="srsti-leaf olive-1" viewBox="0 0 32 38" fill="none">
            <ellipse cx="16" cy="19" rx="14" ry="17" fill="#7E9646"/>
            <ellipse cx="12" cy="14" rx="4" ry="7" fill="#A4BE68" opacity="0.7"/>
          </svg>

          <!-- Green Spanish Olive 2 -->
          <svg class="srsti-leaf olive-2" viewBox="0 0 32 38" fill="none">
            <ellipse cx="16" cy="19" rx="13" ry="16" fill="#88A34A"/>
            <ellipse cx="13" cy="13" rx="3.5" ry="6" fill="#BFDC7F" opacity="0.75"/>
          </svg>
        </div>
      </div>

      <!-- ========================================================
           HERO 2: SQUEEZE BOTTLE POURING INTO CERAMIC CUP
           ======================================================== -->
      <div class="srsti-hero-view" id="view-hero-2">
        <div class="srsti-bottle-pour-wrap">
          <!-- Tilted Squeeze Bottle Pouring from Above -->
          <div class="srsti-floating-pour-bottle">
            <img src="/assets/images/bottle_1.png" alt="SRSTI Drizzle Squeeze Bottle" />
          </div>

          <!-- Flowing Liquid Gold Stream Connecting Nozzle to Cup -->
          <svg style="position:absolute; top:75px; left:190px; width:70px; height:180px; z-index:7; pointer-events:none;" viewBox="0 0 70 180" fill="none">
            <defs>
              <linearGradient id="streamGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#E5BF28"/>
                <stop offset="60%" stop-color="#D7CA2C"/>
                <stop offset="100%" stop-color="#BACD28"/>
              </linearGradient>
            </defs>
            <path d="M 12,0 Q 25,60 42,165" stroke="url(#streamGrad2)" stroke-width="7" stroke-linecap="round"/>
            <path d="M 13,0 Q 26,60 43,165" stroke="#FFF7A8" stroke-width="2" stroke-linecap="round"/>
          </svg>

          <!-- Ceramic Cup Receiving the Oil -->
          <div class="srsti-cup-receiver">
            <svg width="240" height="200" viewBox="0 0 280 240" fill="none" style="filter: drop-shadow(0 20px 30px rgba(40,48,30,0.22));">
              <!-- Ceramic Cup Outer Body -->
              <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 C 215,96 65,96 40,85 Z" fill="url(#cupClay)" stroke="#BFAF96" stroke-width="2"/>
              <!-- Cup Rim Outer Ellipse -->
              <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="url(#cupRimHighlight)" stroke-width="2.5"/>
              <!-- Pool of Golden Olive Oil -->
              <ellipse cx="140" cy="86" rx="92" ry="32" fill="url(#oilPool)"/>
              <ellipse cx="140" cy="86" rx="75" ry="24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
              <!-- Surface Specular Light Arc -->
              <path d="M 75,76 Q 140,96 205,76" stroke="url(#oilSheen)" stroke-width="4.5" stroke-linecap="round"/>
              <circle cx="140" cy="86" r="6" fill="#FFF7A8" filter="blur(0.5px)"/>
            </svg>
          </div>

          <!-- Spec Pills Orbiting Hero 2 -->
          <div class="srsti-spec-pill" style="top: 15%; right: 40px;">
            <span>Chef Squeeze Tip</span>
          </div>
          <div class="srsti-spec-pill" style="bottom: 18%; left: 20px;">
            <span>500ml Cold-Pressed</span>
          </div>

          <!-- Floating Leaves -->
          <svg class="srsti-leaf" style="top: 25%; right: 10px; width: 44px;" viewBox="0 0 60 70" fill="none">
            <path d="M 5,10 Q 35,25 55,65 Q 25,45 5,10 Z" fill="#586E36"/>
          </svg>
          <svg class="srsti-leaf" style="bottom: 12%; right: 15px; width: 56px;" viewBox="0 0 70 80" fill="none">
            <path d="M 65,10 Q 35,45 10,75 Q 45,55 65,10 Z" fill="#758E4A"/>
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

  <!-- Interactive Switcher Script & Cursor Parallax -->
  <script>
    const heroSelect = document.getElementById('heroSelect');
    const view1 = document.getElementById('view-hero-1');
    const view2 = document.getElementById('view-hero-2');
    const stage = document.getElementById('centerStage');

    function switchHero(val) {
      if (val === 'hero-1') {
        view1.classList.add('active');
        view2.classList.remove('active');
      } else {
        view2.classList.add('active');
        view1.classList.remove('active');
      }
    }

    heroSelect.addEventListener('change', (e) => {
      switchHero(e.target.value);
    });

    // 3D Parallax on Mouse Movement (Just like the video!)
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      const leaves = document.querySelectorAll('.srsti-leaf');
      leaves.forEach((leaf, i) => {
        const factor = (i + 1) * 7;
        leaf.style.transform = \`translate(\${dx * factor}px, \${dy * factor}px)\`;
      });

      const pills = document.querySelectorAll('.srsti-spec-pill');
      pills.forEach((pill, i) => {
        const factor = (i + 1) * 4;
        pill.style.transform = \`translate(\${dx * factor}px, \${dy * factor}px)\`;
      });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('hero_test.html', testHtml, 'utf8');
console.log('hero_test.html written successfully!');
