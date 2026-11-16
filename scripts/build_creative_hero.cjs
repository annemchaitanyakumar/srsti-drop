const fs = require('fs');

const heroHTML = `
<!-- =======================================================================
     SRSTI 5-LAYER PARALLAX HERO (AUTHENTIC BRAND EDITION)
     ======================================================================= -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<style>
  :root {
    --srsti-bg: #FAF8F5;
    --srsti-text: #1F2718;
    --srsti-text-muted: #55624B;
    --srsti-gold: #E5B824;
    --srsti-gold-soft: #F9E8A2;
    --srsti-lime: #D1E030;
    --srsti-forest: #22301B;
    --srsti-border: rgba(31, 39, 24, 0.14);
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

  /* Outer Scroll Track */
  .srsti-hero-track {
    position: relative;
    width: 100%;
    height: 220vh;
    background: #FAF8F5;
    box-sizing: border-box;
  }

  /* Sticky Viewport Stage */
  .srsti-hero-sticky-stage {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    min-height: 680px;
    max-height: 1000px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 72px 28px 18px 28px;
    box-sizing: border-box;
    background: radial-gradient(circle 950px at 50% 38%, #FFFFFF 0%, #FAF8F5 55%, #F1E9DE 100%);
  }

  /* =========================================================================
     LAYER 1: Deep Atmosphere, Ambient Sunburst & Typographic Marquee (Speed 0.15)
     ========================================================================= */
  .srsti-layer-1 {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    will-change: transform;
  }

  /* Ambient Pulsing Warm Solar Glow */
  .srsti-l1-solar-aura {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(229, 184, 36, 0.22) 0%, rgba(209, 224, 48, 0.12) 36%, rgba(250, 248, 245, 0) 70%);
    filter: blur(40px);
    opacity: 0.9;
    will-change: transform, opacity;
  }

  /* Topographic Grove Elevation Contour Lines */
  .srsti-l1-contours {
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    height: 360px;
    opacity: 0.16;
  }

  /* Giant Drift Marquee Watermark */
  .srsti-l1-marquee {
    position: absolute;
    top: 36%;
    left: 0;
    width: 250%;
    white-space: nowrap;
    display: flex;
    gap: 40px;
    transform: translateY(-50%);
    opacity: 0.045;
    font-family: 'Playfair Display', serif;
    font-size: clamp(80px, 10vw, 140px);
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #1F2718;
    user-select: none;
    will-change: transform;
  }

  /* =========================================================================
     LAYER 2: Playful Brand Stickers, Heritage Wax Seal & GPS Pill (Speed 0.38)
     ========================================================================= */
  .srsti-layer-2 {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
    will-change: transform;
  }

  /* Olive Branch Upper Left */
  .srsti-l2-branch-left {
    position: absolute;
    top: 50px;
    left: -20px;
    width: 240px;
    height: 250px;
    opacity: 0.85;
    filter: drop-shadow(0 12px 20px rgba(31, 39, 24, 0.12));
    will-change: transform;
  }

  /* Olive Branch Upper Right */
  .srsti-l2-branch-right {
    position: absolute;
    top: 60px;
    right: -20px;
    width: 250px;
    height: 260px;
    opacity: 0.85;
    filter: drop-shadow(0 12px 20px rgba(31, 39, 24, 0.12));
    will-change: transform;
  }

  /* Rotating Heritage Wax Seal Badge */
  .srsti-l2-wax-seal {
    position: absolute;
    top: 110px;
    left: 5%;
    width: 100px;
    height: 100px;
    pointer-events: auto;
    cursor: pointer;
    filter: drop-shadow(0 8px 16px rgba(31, 39, 24, 0.1));
    will-change: transform;
    transition: transform 0.3s ease;
  }
  .srsti-l2-wax-seal:hover {
    transform: scale(1.08) !important;
  }

  /* Harvest Coordinate Pill */
  .srsti-l2-coord-pill {
    position: absolute;
    top: 120px;
    right: 5%;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.92);
    border: 1.5px solid var(--srsti-border);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 9999px;
    padding: 6px 16px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #2D3A24;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  }

  /* =========================================================================
     TOP EDITORIAL HEADER STACK
     ========================================================================= */
  .srsti-hero-header-wrap {
    position: relative;
    z-index: 10;
    text-align: center;
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    will-change: transform, opacity;
  }

  /* Eyebrow Pill */
  .srsti-eyebrow-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.92);
    border: 1.5px solid rgba(31, 39, 24, 0.16);
    border-radius: 9999px;
    padding: 5px 16px;
    margin-bottom: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #2D3922;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
  .srsti-eyebrow-pill .star-glow {
    color: var(--srsti-gold);
    font-size: 12px;
  }

  /* Main Headline */
  .srsti-hero-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 3.5vw, 48px);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: #1F2718;
    margin-bottom: 8px;
    max-width: 820px;
  }
  .srsti-hero-headline em {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    color: #2B3A21;
  }

  /* Subtitle */
  .srsti-hero-lead {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(13px, 1.05vw, 15px);
    line-height: 1.48;
    color: var(--srsti-text-muted);
    max-width: 620px;
    margin-bottom: 14px;
  }

  /* Dual Action CTA Pill Buttons */
  .srsti-cta-dock {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .srsti-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #182213;
    color: #FAF8F5;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 10px 24px;
    border-radius: 9999px;
    text-decoration: none;
    box-shadow: 0 4px 16px rgba(24, 34, 19, 0.25);
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .srsti-cta-primary:hover {
    background: #273620;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(24, 34, 19, 0.35);
  }
  .srsti-cta-primary .btn-badge {
    background: var(--srsti-lime);
    color: #182213;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 9999px;
    margin-left: 2px;
  }

  .srsti-cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.85);
    border: 1.5px solid rgba(31, 39, 24, 0.22);
    color: #1F2718;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 9999px;
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .srsti-cta-secondary:hover {
    background: #FFFFFF;
    border-color: #1F2718;
    transform: translateY(-2px);
  }

  /* =========================================================================
     LAYER 3: The Centerpiece Stage & Iconic Real Squeeze Bottles (Speed 1.00)
     ========================================================================= */
  .srsti-center-stage {
    position: relative;
    width: 100%;
    max-width: 980px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -5px;
    z-index: 5;
    will-change: transform;
  }

  /* Master Bottles Duo Rig */
  .srsti-bottles-rig {
    position: relative;
    width: 480px;
    height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
  }

  /* Ground Ambient Drop Shadow */
  .srsti-ground-shadow {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 380px;
    height: 35px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(31, 39, 24, 0.26) 0%, rgba(31, 39, 24, 0.08) 50%, transparent 70%);
    filter: blur(8px);
    z-index: 4;
    will-change: transform, opacity;
  }

  /* Left Bottle: DRIZZLE (Finishing Oil) */
  .srsti-bottle-drizzle {
    position: absolute;
    bottom: 30px;
    left: 70px;
    width: 155px;
    height: 330px;
    z-index: 8;
    filter: drop-shadow(-8px 18px 24px rgba(31, 39, 24, 0.2));
    will-change: transform;
    transform-origin: 50% 85%;
    transition: filter 0.3s ease;
  }
  .srsti-bottle-drizzle img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
  }

  /* Right Bottle: SIZZLE (Cooking Oil) */
  .srsti-bottle-sizzle {
    position: absolute;
    bottom: 30px;
    right: 70px;
    width: 165px;
    height: 330px;
    z-index: 7;
    filter: drop-shadow(8px 18px 24px rgba(31, 39, 24, 0.2));
    will-change: transform;
    transform-origin: 50% 85%;
    transition: filter 0.3s ease;
  }
  .srsti-bottle-sizzle img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
  }

  /* Center Floating "THE DUO" Badge */
  .srsti-duo-tag {
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    background: #182213;
    color: #FAF8F5;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    padding: 4px 14px;
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(24, 34, 19, 0.2);
    z-index: 10;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .srsti-duo-tag .star {
    color: var(--srsti-lime);
  }

  /* =========================================================================
     LAYER 4: Floating Culinary Tasting Cards (Speed 1.45)
     ========================================================================= */
  .srsti-layer-4 {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 12;
    overflow: hidden;
    will-change: transform;
  }

  /* Floating Card Base */
  .srsti-card-floating {
    position: absolute;
    pointer-events: auto;
    background: rgba(255, 255, 255, 0.94);
    border: 1.5px solid rgba(31, 39, 24, 0.14);
    border-radius: 18px;
    padding: 16px 20px;
    box-shadow: 0 16px 36px rgba(31, 39, 24, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
    will-change: transform;
    cursor: pointer;
  }
  .srsti-card-floating:hover {
    transform: translateY(-6px) scale(1.02) !important;
    box-shadow: 0 22px 45px rgba(31, 39, 24, 0.14);
    border-color: #1F2718;
  }

  .srsti-card-drizzle {
    top: 40%;
    left: 4%;
    width: 250px;
  }

  .srsti-card-sizzle {
    top: 42%;
    right: 4%;
    width: 250px;
  }

  .srsti-card-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 9999px;
    margin-bottom: 8px;
  }
  .badge-drizzle {
    background: #E8EDE4;
    color: #27371E;
  }
  .badge-sizzle {
    background: #F8F4DC;
    color: #8C6F0A;
  }

  .srsti-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 700;
    color: #1F2718;
    margin-bottom: 4px;
  }
  .srsti-card-desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11.5px;
    line-height: 1.5;
    color: #55624B;
    margin-bottom: 10px;
  }

  /* Flavor Notes Tag Cluster */
  .srsti-flavor-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
  }
  .srsti-flavor-tag {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    color: #2E3A25;
    background: #F2EFE8;
    border-radius: 6px;
    padding: 3px 7px;
  }

  .srsti-card-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(31, 39, 24, 0.08);
    padding-top: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #1F2718;
  }

  /* Center Floating Precision Pill */
  .srsti-floating-center-pill {
    position: absolute;
    bottom: 22%;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid var(--srsti-border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 9999px;
    padding: 7px 18px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    color: #28341E;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
    white-space: nowrap;
    will-change: transform;
  }
  .srsti-floating-center-pill .gold-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--srsti-gold);
  }

  /* =========================================================================
     LAYER 5: Macro Camera Foregrounds & Interactive Scroll HUD (Speed 2.10)
     ========================================================================= */
  .srsti-layer-5 {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 20;
    overflow: hidden;
    will-change: transform;
  }

  /* Macro Blurred Olive Leaves Passing in Foreground */
  .srsti-l5-macro-leaf-1 {
    position: absolute;
    top: -20px;
    right: 2%;
    width: 130px;
    height: 130px;
    filter: blur(4.5px) drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2));
    opacity: 0.78;
    transform: rotate(24deg);
    will-change: transform;
  }

  .srsti-l5-macro-leaf-2 {
    position: absolute;
    bottom: -30px;
    left: 2%;
    width: 150px;
    height: 150px;
    filter: blur(5.5px) drop-shadow(0 20px 30px rgba(0, 0, 0, 0.2));
    opacity: 0.75;
    transform: rotate(-18deg);
    will-change: transform;
  }

  /* Floating Macro Crystal Droplets */
  .srsti-macro-drop {
    position: absolute;
    width: 22px;
    height: 32px;
    filter: drop-shadow(0 4px 10px rgba(229, 184, 36, 0.45));
    will-change: transform;
  }

  /* =========================================================================
     BOTTOM INTERACTIVE SCROLL HUD DOCK
     ========================================================================= */
  .srsti-bottom-hud-bar {
    position: relative;
    z-index: 25;
    width: 100%;
    max-width: 900px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.94);
    border: 1.5px solid rgba(31, 39, 24, 0.14);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 9999px;
    padding: 8px 22px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-top: 10px;
  }

  /* Left: 3-Stage Scroll Phase Steps */
  .srsti-hud-phases {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .srsti-hud-phase-step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    color: #7D8874;
    transition: color 0.25s ease;
  }
  .srsti-hud-phase-step.active {
    color: #1F2718;
  }
  .srsti-hud-phase-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #C4CBBF;
    transition: all 0.25s ease;
  }
  .srsti-hud-phase-step.active .srsti-hud-phase-dot {
    background: var(--srsti-gold);
    transform: scale(1.3);
  }

  /* Center: Animated Scroll Cue */
  .srsti-hud-scroll-cue {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #28351F;
    cursor: pointer;
    user-select: none;
  }
  .srsti-hud-scroll-cue svg {
    animation: bounceDrip 2s infinite ease-in-out;
  }
  @keyframes bounceDrip {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(4px); }
  }

  /* Right: Live Progress Meter & Quick Shop */
  .srsti-hud-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .srsti-hud-meter-track {
    width: 60px;
    height: 4px;
    background: rgba(31, 39, 24, 0.12);
    border-radius: 9999px;
    overflow: hidden;
  }
  .srsti-hud-meter-fill {
    width: 0%;
    height: 100%;
    background: var(--srsti-gold);
    border-radius: 9999px;
    transition: width 0.1s linear;
  }
  .srsti-hud-pct-text {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 800;
    color: #1F2718;
    width: 32px;
  }
  .srsti-hud-shop-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #182213;
    color: #FAF8F5;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 9999px;
    text-decoration: none;
    transition: background 0.2s ease;
  }
  .srsti-hud-shop-btn:hover {
    background: #2C3C24;
  }

  /* Responsive Rules */
  @media (max-width: 1024px) {
    .srsti-card-floating {
      width: 210px;
      padding: 12px 16px;
    }
    .srsti-card-drizzle { left: 1.5%; }
    .srsti-card-sizzle { right: 1.5%; }
    .srsti-bottles-rig {
      width: 420px;
    }
    .srsti-bottle-drizzle { width: 135px; height: 290px; left: 45px; }
    .srsti-bottle-sizzle { width: 145px; height: 290px; right: 45px; }
  }

  @media (max-width: 768px) {
    .srsti-hero-track {
      height: 160vh;
    }
    .srsti-hero-sticky-stage {
      padding: 65px 16px 14px 16px;
    }
    .srsti-hero-headline {
      font-size: 28px;
      line-height: 1.15;
    }
    .srsti-hero-lead {
      font-size: 12.5px;
      margin-bottom: 12px;
    }
    .srsti-card-floating {
      display: none;
    }
    .srsti-center-stage {
      height: 320px;
    }
    .srsti-bottles-rig {
      transform: scale(0.82);
    }
    .srsti-bottom-hud-bar {
      padding: 8px 16px;
    }
    .srsti-hud-phases {
      display: none;
    }
    .srsti-l2-wax-seal {
      display: none;
    }
    .srsti-l2-coord-pill {
      display: none;
    }
  }
</style>

<!-- =========================================================================
     MASTER HERO COMPONENT MARKUP
     ========================================================================= -->
<div class="srsti-hero-track" id="srstiHeroTrack">
  <div class="srsti-hero-sticky-stage" id="srstiHeroStage">

    <!-- LAYER 1: Deep Atmosphere, Ambient Sunburst & Typographic Marquee (Speed 0.15) -->
    <div class="srsti-layer-1" id="srstiLayer1">
      <div class="srsti-l1-solar-aura" id="srstiSolarAura"></div>
      
      <!-- Topographic Contour Curves of Jaén Grove Elevation -->
      <svg class="srsti-l1-contours" viewBox="0 0 1440 360" fill="none" preserveAspectRatio="none">
        <path d="M-10,360 C320,310 540,340 880,290 C1180,250 1340,300 1460,280 L1460,360 Z" stroke="#25351A" stroke-width="1.2" fill="none"/>
        <path d="M-10,360 C260,270 620,320 960,240 C1220,190 1380,260 1460,230 L1460,360 Z" stroke="#25351A" stroke-width="1.2" fill="none"/>
        <path d="M-10,360 C180,220 500,260 840,190 C1140,140 1320,210 1460,170 L1460,360 Z" stroke="#25351A" stroke-width="1" fill="none" opacity="0.6"/>
      </svg>

      <!-- Giant Marquee Drifting in Deep Background -->
      <div class="srsti-l1-marquee" id="srstiMarquee">
        <span>SRSTI • 100% PICUAL OLIVES • EXTRA VIRGIN OLIVE OIL • ESTATE BOTTLED • JAÉN, ANDALUSIA • ZERO BLENDS • NEVER CUT •</span>
        <span>SRSTI • 100% PICUAL OLIVES • EXTRA VIRGIN OLIVE OIL • ESTATE BOTTLED • JAÉN, ANDALUSIA • ZERO BLENDS • NEVER CUT •</span>
      </div>
    </div>

    <!-- LAYER 2: Playful Brand Stickers, Heritage Wax Seal & GPS Pill (Speed 0.38) -->
    <div class="srsti-layer-2" id="srstiLayer2">
      <!-- Left Olive Tree Branch -->
      <svg class="srsti-l2-branch-left" id="srstiBranchLeft" viewBox="0 0 240 250" fill="none">
        <path d="M 0,20 Q 80,65 150,150 Q 200,205 240,250" stroke="#344324" stroke-width="4.2" stroke-linecap="round"/>
        <path d="M 80,65 Q 130,35 180,40" stroke="#344324" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Olive leaves -->
        <path d="M 110,50 Q 150,20 180,40 Q 145,70 110,50 Z" fill="#5A713C"/>
        <path d="M 110,50 Q 145,40 180,40" stroke="#7C9752" stroke-width="1.2"/>
        <path d="M 150,130 Q 190,95 220,115 Q 185,150 150,130 Z" fill="#4B6032"/>
        <!-- Plump Picual Olives -->
        <ellipse cx="135" cy="80" rx="14" ry="19" fill="#6B853E" transform="rotate(-15 135 80)"/>
        <ellipse cx="131" cy="75" rx="3.5" ry="7.5" fill="#93B25E" opacity="0.8" transform="rotate(-15 131 75)"/>
        <ellipse cx="185" cy="160" rx="15" ry="20" fill="#556C30" transform="rotate(22 185 160)"/>
        <ellipse cx="181" cy="154" rx="3.5" ry="7.5" fill="#7E9E4C" opacity="0.8" transform="rotate(22 181 154)"/>
      </svg>

      <!-- Right Olive Tree Branch -->
      <svg class="srsti-l2-branch-right" id="srstiBranchRight" viewBox="0 0 250 260" fill="none">
        <path d="M 250,25 Q 160,70 90,150 Q 45,205 10,250" stroke="#344324" stroke-width="4.2" stroke-linecap="round"/>
        <path d="M 160,70 Q 115,40 70,45" stroke="#344324" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Olive leaves -->
        <path d="M 125,55 Q 85,25 60,45 Q 95,75 125,55 Z" fill="#586E3A"/>
        <path d="M 90,135 Q 50,105 25,125 Q 60,155 90,135 Z" fill="#4B6032"/>
        <!-- Olives -->
        <ellipse cx="105" cy="85" rx="14" ry="19" fill="#68813C" transform="rotate(18 105 85)"/>
        <ellipse cx="101" cy="80" rx="3.5" ry="7.5" fill="#93B25E" opacity="0.8" transform="rotate(18 101 80)"/>
      </svg>

      <!-- Rotating Heritage Wax Seal Badge -->
      <div class="srsti-l2-wax-seal" id="srstiWaxSeal" title="Certificado Origen Jaén">
        <svg viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" fill="#FBF8F1" stroke="#1F2718" stroke-width="1.8"/>
          <circle cx="50" cy="50" r="41" stroke="#1F2718" stroke-width="0.9" stroke-dasharray="2 2.5"/>
          <path id="sealPathNew" d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" fill="none"/>
          <text font-family="'Plus Jakarta Sans', sans-serif" font-size="7.5" font-weight="800" fill="#1F2718" letter-spacing="1.8">
            <textPath href="#sealPathNew" startOffset="0%">
              • 100% SINGLE ORIGIN • COLD PRESSED &lt; 24H • JAÉN 2024
            </textPath>
          </text>
          <!-- Center Sunburst Star -->
          <circle cx="50" cy="50" r="12" fill="#1F2718"/>
          <path d="M 50,42 L 52.2,47.8 L 58,50 L 52.2,52.2 L 50,58 L 47.8,52.2 L 42,50 L 47.8,47.8 Z" fill="#E5B824"/>
        </svg>
      </div>

      <!-- Harvest Coordinate Pill -->
      <div class="srsti-l2-coord-pill">
        <span style="color:#C69F1B;">✦</span>
        <span>37°46'N 3°47'W • ELEV. 820M</span>
      </div>
    </div>

    <!-- TOP HEADER STACK -->
    <div class="srsti-hero-header-wrap" id="srstiHeaderStack">
      <div class="srsti-eyebrow-pill">
        <span class="star-glow">✦</span>
        <span>ESTATE HARVEST • JAÉN, ANDALUSIA</span>
        <span class="star-glow">✦</span>
      </div>

      <h1 class="srsti-hero-headline">
        Extra Virgin Olive Oil, <br>
        <em>Crafted to Squeeze, Sizzle &amp; Drizzle.</em>
      </h1>

      <p class="srsti-hero-lead">
        Single-varietal 100% Picual olives picked fresh from Spanish groves and cold-pressed within 24 hours. Bottled in precision squeezy bottles designed by chefs — never blended, never cut.
      </p>

      <div class="srsti-cta-dock">
        <a href="/products/sizzle-drizzle-combo-pack" class="srsti-cta-primary">
          <span>Get The Duo</span>
          <span class="btn-badge">$38</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="#about-srsti" class="srsti-cta-secondary" id="srstiScrollBtn">
          <span>Taste The Freshness</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
      </div>
    </div>

    <!-- LAYER 3: The Centerpiece Stage & Iconic Real Squeeze Bottles (Speed 1.00) -->
    <div class="srsti-center-stage" id="srstiCenterStage">
      
      <!-- Master Bottles Rig -->
      <div class="srsti-bottles-rig" id="srstiBottlesRig">
        
        <!-- Ground Ambient Drop Shadow -->
        <div class="srsti-ground-shadow" id="srstiGroundShadow"></div>

        <!-- Center Floating Duo Pill -->
        <div class="srsti-duo-tag">
          <span class="star">✦</span>
          <span>THE ALL-STAR DUO</span>
        </div>

        <!-- Left Bottle: DRIZZLE -->
        <div class="srsti-bottle-drizzle" id="srstiBottleDrizzle">
          <img src="/assets/images/drizzle_bottle.png" alt="SRSTI Drizzle Finishing Olive Oil" />
        </div>

        <!-- Right Bottle: SIZZLE -->
        <div class="srsti-bottle-sizzle" id="srstiBottleSizzle">
          <img src="/assets/images/sizzle_bottle.png" alt="SRSTI Sizzle Cooking Olive Oil" />
        </div>

      </div>
    </div>

    <!-- LAYER 4: Floating Culinary Tasting Cards (Speed 1.45) -->
    <div class="srsti-layer-4" id="srstiLayer4">
      
      <!-- Card Left: Drizzle Tasting Profile -->
      <div class="srsti-card-floating srsti-card-drizzle" id="srstiCardDrizzle">
        <span class="srsti-card-badge badge-drizzle">✦ THE FINISHING OIL</span>
        <h3 class="srsti-card-title">Drizzle • 750ml</h3>
        <p class="srsti-card-desc">Picked young in early October when olives are small, green, and loaded with potent polyphenols.</p>
        <div class="srsti-flavor-tags">
          <span class="srsti-flavor-tag">Fresh Herb</span>
          <span class="srsti-flavor-tag">Green Tomato</span>
          <span class="srsti-flavor-tag">Peppery Kick</span>
        </div>
        <div class="srsti-card-stat">
          <span>Acidity &le; 0.14%</span>
          <span style="color:#C69F1B;">★ 4.9 (18k+ reviews)</span>
        </div>
      </div>

      <!-- Card Right: Sizzle Tasting Profile -->
      <div class="srsti-card-floating srsti-card-sizzle" id="srstiCardSizzle">
        <span class="srsti-card-badge badge-sizzle">🔥 THE EVERYDAY COOKING OIL</span>
        <h3 class="srsti-card-title">Sizzle • 750ml</h3>
        <p class="srsti-card-desc">Harvested late November for a buttery, mellow richness. High smoke point (410°F) built for roasting &amp; searing.</p>
        <div class="srsti-flavor-tags">
          <span class="srsti-flavor-tag">Ripe Olive</span>
          <span class="srsti-flavor-tag">Sweet Almond</span>
          <span class="srsti-flavor-tag">410°F Heat Safe</span>
        </div>
        <div class="srsti-card-stat">
          <span>Zero Seed Oils</span>
          <span style="color:#27371E; font-weight:800;">Chef Approved</span>
        </div>
      </div>

      <!-- Center Floating Precision Pill -->
      <div class="srsti-floating-center-pill" id="srstiCenterPill">
        <span class="gold-dot"></span>
        <span>CHEF'S SQUEEZE BOTTLE • EXACT MEASURED POUR • ZERO DRIPS</span>
        <span class="gold-dot"></span>
      </div>

    </div>

    <!-- LAYER 5: Macro Camera Foregrounds & Interactive Scroll HUD (Speed 2.10) -->
    <div class="srsti-layer-5" id="srstiLayer5">
      <!-- Top-Right Macro Blurred Olive Leaf -->
      <svg class="srsti-l5-macro-leaf-1" id="srstiMacroLeaf1" viewBox="0 0 100 100" fill="none">
        <path d="M 15,90 Q 40,25 90,10 Q 60,65 15,90 Z" fill="#475C2C"/>
        <path d="M 15,90 Q 50,45 90,10" stroke="#77964A" stroke-width="2.5"/>
      </svg>

      <!-- Bottom-Left Macro Blurred Olive Leaf -->
      <svg class="srsti-l5-macro-leaf-2" id="srstiMacroLeaf2" viewBox="0 0 110 110" fill="none">
        <path d="M 95,15 Q 35,40 10,95 Q 65,70 95,15 Z" fill="#3D5025"/>
        <path d="M 95,15 Q 52,55 10,95" stroke="#68843B" stroke-width="2.5"/>
      </svg>

      <!-- Floating Macro Droplet Top Left -->
      <svg class="srsti-macro-drop" style="top: 22%; left: 16%;" viewBox="0 0 24 32" fill="none">
        <path d="M 12,2 C 12,2 2,16 2,22 C 2,27.5 6.5,32 12,32 C 17.5,32 22,27.5 22,22 C 22,16 12,2 12,2 Z" fill="#F0C628" opacity="0.85"/>
        <ellipse cx="8" cy="20" rx="3" ry="5" fill="#FFFFFF" opacity="0.75" transform="rotate(-20 8 20)"/>
      </svg>

      <!-- Floating Macro Droplet Bottom Right -->
      <svg class="srsti-macro-drop" style="bottom: 26%; right: 18%;" viewBox="0 0 24 32" fill="none">
        <path d="M 12,2 C 12,2 2,16 2,22 C 2,27.5 6.5,32 12,32 C 17.5,32 22,27.5 22,22 C 22,16 12,2 12,2 Z" fill="#E8B820" opacity="0.85"/>
        <ellipse cx="8" cy="20" rx="3" ry="5" fill="#FFFFFF" opacity="0.75" transform="rotate(-20 8 20)"/>
      </svg>
    </div>

    <!-- BOTTOM INTERACTIVE SCROLL HUD DOCK -->
    <div class="srsti-bottom-hud-bar" id="srstiBottomHud">
      <!-- 3-Phase Scroll Milestones -->
      <div class="srsti-hud-phases">
        <div class="srsti-hud-phase-step active" id="phaseStep1">
          <span class="srsti-hud-phase-dot"></span>
          <span>01 THE GROVE</span>
        </div>
        <div class="srsti-hud-phase-step" id="phaseStep2">
          <span class="srsti-hud-phase-dot"></span>
          <span>02 COLD PRESS</span>
        </div>
        <div class="srsti-hud-phase-step" id="phaseStep3">
          <span class="srsti-hud-phase-dot"></span>
          <span>03 THE DUO</span>
        </div>
      </div>

      <!-- Center Interactive Scroll Cue -->
      <div class="srsti-hud-scroll-cue" id="srstiScrollCue" title="Click to scroll down">
        <span>SCROLL TO EXPLORE</span>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M 7,1 L 7,13 M 2,8 L 7,13 L 12,8" stroke="#1F2718" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="7" cy="16" r="1.5" fill="#E5B824"/>
        </svg>
      </div>

      <!-- Right: Live Progress Meter & Quick Shop -->
      <div class="srsti-hud-right">
        <div class="srsti-hud-meter-track">
          <div class="srsti-hud-meter-fill" id="srstiMeterFill"></div>
        </div>
        <span class="srsti-hud-pct-text" id="srstiPctText">0%</span>
        <a href="/products/sizzle-drizzle-combo-pack" class="srsti-hud-shop-btn">
          <span>Add Duo</span>
          <span>• $38</span>
        </a>
      </div>
    </div>

  </div>
</div>

<!-- =========================================================================
     SMOOTH 5-LAYER PARALLAX & SCROLL INTERACTION SCRIPT
     ========================================================================= -->
<script>
(function() {
  const track = document.getElementById('srstiHeroTrack');
  const stage = document.getElementById('srstiHeroStage');
  if (!track || !stage) return;

  // Layer Elements
  const marquee = document.getElementById('srstiMarquee');
  const solarAura = document.getElementById('srstiSolarAura');
  const branchLeft = document.getElementById('srstiBranchLeft');
  const branchRight = document.getElementById('srstiBranchRight');
  const waxSeal = document.getElementById('srstiWaxSeal');
  const headerStack = document.getElementById('srstiHeaderStack');
  
  // Centerpiece Layer 3 Elements
  const bottlesRig = document.getElementById('srstiBottlesRig');
  const bottleDrizzle = document.getElementById('srstiBottleDrizzle');
  const bottleSizzle = document.getElementById('srstiBottleSizzle');
  const groundShadow = document.getElementById('srstiGroundShadow');

  // Foreground Cards & HUD
  const cardDrizzle = document.getElementById('srstiCardDrizzle');
  const cardSizzle = document.getElementById('srstiCardSizzle');
  const centerPill = document.getElementById('srstiCenterPill');
  const macroLeaf1 = document.getElementById('srstiMacroLeaf1');
  const macroLeaf2 = document.getElementById('srstiMacroLeaf2');
  const meterFill = document.getElementById('srstiMeterFill');
  const pctText = document.getElementById('srstiPctText');
  const step1 = document.getElementById('phaseStep1');
  const step2 = document.getElementById('phaseStep2');
  const step3 = document.getElementById('phaseStep3');

  // Mouse Gyroscope Parallax state
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetMouseX = (e.clientX - cx) / cx; // -1 to 1
    targetMouseY = (e.clientY - cy) / cy; // -1 to 1
  }, { passive: true });

  // Scroll Progress Calculation
  let currentProgress = 0;
  let targetProgress = 0;

  const urlParams = new URLSearchParams(window.location.search);
  const forcedProgress = urlParams.get('p') !== null ? parseFloat(urlParams.get('p')) : null;
  const forcedScroll = urlParams.get('scroll') !== null ? parseInt(urlParams.get('scroll'), 10) : null;
  if (forcedScroll !== null) {
    window.scrollTo(0, forcedScroll);
  }

  function calculateProgress() {
    if (forcedProgress !== null) return forcedProgress;
    const rect = track.getBoundingClientRect();
    const trackHeight = rect.height;
    const windowH = window.innerHeight;
    const scrollDist = trackHeight - windowH;

    if (scrollDist <= 0) return 0;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollDist));
    return p;
  }

  // Animation Loop with smooth Lerp interpolation
  function render() {
    targetProgress = calculateProgress();
    // Smooth lerp for silky physics
    currentProgress += (targetProgress - currentProgress) * 0.12;
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    const p = currentProgress;

    // 1. LAYER 1: Deep Atmosphere & Marquee (Parallax factor: 0.15)
    if (marquee) {
      const marqueeX = -p * 300 + mouseX * -15;
      marquee.style.transform = 'translate3d(' + marqueeX + 'px, ' + (p * 35 + mouseY * -8) + 'px, 0)';
    }
    if (solarAura) {
      const auraScale = 1 + p * 0.22;
      const auraOpacity = 0.9 - p * 0.3;
      solarAura.style.transform = 'translate(-50%, -50%) scale(' + auraScale + ') translate3d(' + (mouseX * 20) + 'px, ' + (mouseY * 20) + 'px, 0)';
      solarAura.style.opacity = auraOpacity;
    }

    // 2. LAYER 2: Grove Botanical Branches & Wax Seal (Parallax factor: 0.38)
    if (branchLeft) {
      branchLeft.style.transform = 'translate3d(' + (mouseX * 16) + 'px, ' + (-p * 130 + mouseY * 10) + 'px, 0) rotate(' + (-p * 5) + 'deg)';
    }
    if (branchRight) {
      branchRight.style.transform = 'translate3d(' + (mouseX * -16) + 'px, ' + (-p * 140 + mouseY * 10) + 'px, 0) rotate(' + (p * 4) + 'deg)';
    }
    if (waxSeal) {
      const sealRot = p * 200;
      waxSeal.style.transform = 'translate3d(' + (mouseX * 14) + 'px, ' + (-p * 100 + mouseY * 8) + 'px, 0) rotate(' + sealRot + 'deg)';
    }

    // Header Stack fade & slight rise as user enters stage 2
    if (headerStack) {
      const headerFade = Math.max(0, 1 - p * 1.6);
      const headerY = -p * 85;
      headerStack.style.transform = 'translate3d(' + (mouseX * 8) + 'px, ' + (headerY + mouseY * 6) + 'px, 0)';
      headerStack.style.opacity = headerFade.toFixed(3);
    }

    // 3. LAYER 3: The Centerpiece Stage & Iconic Bottles (Parallax factor: 1.00)
    // Bottles lift and separate gracefully as user scrolls
    if (bottleDrizzle && bottleSizzle) {
      const drizzleY = -p * 30 + (mouseY * 10);
      const drizzleX = -p * 12 + (mouseX * 8);
      const drizzleRot = -3 - p * 8 + (mouseX * 3);
      bottleDrizzle.style.transform = 'translate3d(' + drizzleX + 'px, ' + drizzleY + 'px, 0) rotate(' + drizzleRot + 'deg)';

      const sizzleY = -p * 25 + (mouseY * 10);
      const sizzleX = p * 12 + (mouseX * 8);
      const sizzleRot = 3 + p * 8 - (mouseX * 3);
      bottleSizzle.style.transform = 'translate3d(' + sizzleX + 'px, ' + sizzleY + 'px, 0) rotate(' + sizzleRot + 'deg)';
    }

    if (groundShadow) {
      const shadowScale = 1 + p * 0.15;
      const shadowOpacity = Math.max(0.12, 0.26 - p * 0.12);
      groundShadow.style.transform = 'translateX(-50%) scale(' + shadowScale + ') translate3d(' + (mouseX * 6) + 'px, 0, 0)';
      groundShadow.style.opacity = shadowOpacity.toFixed(2);
    }

    // 4. LAYER 4: Floating Culinary Tasting Cards (Parallax factor: 1.45 - Fast foreground)
    if (cardDrizzle) {
      const cardDY = -p * 290 + (mouseY * 20);
      const cardDX = mouseX * 18;
      cardDrizzle.style.transform = 'translate3d(' + cardDX + 'px, ' + cardDY + 'px, 0) rotate(' + (-2 + mouseX * 2) + 'deg)';
    }
    if (cardSizzle) {
      const cardSY = -p * 310 + (mouseY * 20);
      const cardSX = mouseX * -18;
      cardSizzle.style.transform = 'translate3d(' + cardSX + 'px, ' + cardSY + 'px, 0) rotate(' + (2 - mouseX * 2) + 'deg)';
    }
    if (centerPill) {
      const pillY = -p * 230 + (mouseY * 14);
      centerPill.style.transform = 'translateX(-50%) translate3d(' + (mouseX * 10) + 'px, ' + pillY + 'px, 0)';
    }

    // 5. LAYER 5: Macro Camera Foregrounds (Parallax factor: 2.10 - Hyper close)
    if (macroLeaf1) {
      const ml1Y = -p * 460 + (mouseY * 30);
      macroLeaf1.style.transform = 'translate3d(' + (mouseX * -26) + 'px, ' + ml1Y + 'px, 0) rotate(' + (24 + p * 16) + 'deg)';
    }
    if (macroLeaf2) {
      const ml2Y = -p * 500 + (mouseY * 30);
      macroLeaf2.style.transform = 'translate3d(' + (mouseX * 26) + 'px, ' + ml2Y + 'px, 0) rotate(' + (-18 - p * 18) + 'deg)';
    }

    // 6. HUD Progress Meter & Active Phase Updates
    const pct = Math.round(p * 100);
    if (pctText) pctText.textContent = pct + '%';
    if (meterFill) meterFill.style.width = pct + '%';

    if (step1 && step2 && step3) {
      if (p < 0.33) {
        step1.classList.add('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
      } else if (p < 0.67) {
        step1.classList.remove('active');
        step2.classList.add('active');
        step3.classList.remove('active');
      } else {
        step1.classList.remove('active');
        step2.classList.remove('active');
        step3.classList.add('active');
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Smooth Scroll Trigger Button
  const scrollBtn = document.getElementById('srstiScrollBtn');
  const scrollCue = document.getElementById('srstiScrollCue');
  function scrollToSection4() {
    const s4 = document.getElementById('shopify-section-template--16889120686294__announcement_bar_pTYkYK') || 
               document.querySelector('.srsti-hero-track + *');
    if (s4) {
      s4.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  }
  if (scrollBtn) scrollBtn.addEventListener('click', (e) => { e.preventDefault(); scrollToSection4(); });
  if (scrollCue) scrollCue.addEventListener('click', scrollToSection4);

})();
</script>
`;

module.exports = { heroHTML };
