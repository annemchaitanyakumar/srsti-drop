const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

const html = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { background: #FAF8F5; margin: 0; padding: 40px; display: flex; justify-content: center; font-family: sans-serif; }
  .stage {
    position: relative;
    width: 860px;
    height: 520px;
    background: radial-gradient(circle 600px at 50% 40%, #FFFFFF 0%, #FAF8F5 60%, #F3EDE4 100%);
    border-radius: 20px;
    border: 1px solid #e0d8cb;
    overflow: hidden;
  }
  
  /* Bottle tilted downwards pouring into cup */
  .bottle-wrap {
    position: absolute;
    top: -10px;
    left: 100px;
    width: 250px;
    height: 460px;
    transform: rotate(126deg);
    filter: drop-shadow(-15px 22px 28px rgba(25, 35, 18, 0.24));
    z-index: 10;
  }
  .bottle-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Ceramic Cup */
  .cup-wrap {
    position: absolute;
    bottom: 50px;
    left: 460px;
    width: 280px;
    height: 240px;
    z-index: 6;
  }

  /* Golden Stream Connecting Nozzle to Cup */
  .stream-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 8;
    pointer-events: none;
  }

  .spec-pill {
    position: absolute;
    z-index: 15;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11.5px;
    font-weight: 700;
    color: #2D3624;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(60, 66, 46, 0.16);
    border-radius: 9999px;
    padding: 7px 16px;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  }

  @keyframes rippleWave {
    0% { r: 5px; opacity: 0.9; stroke-width: 2.5; }
    100% { r: 38px; opacity: 0; stroke-width: 0.5; }
  }
  .ripple-ring {
    animation: rippleWave 2.8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
    transform-origin: 140px 86px;
  }
  .ripple-ring:nth-child(2) {
    animation-delay: 1.4s;
  }
</style>
</head>
<body>
  <div class="stage">
    <!-- Bottle -->
    <div class="bottle-wrap">
      <img src="/assets/images/bottle_1.png" alt="Bottle">
    </div>

    <!-- Golden Liquid Stream -->
    <svg class="stream-svg" viewBox="0 0 860 520" fill="none">
      <defs>
        <linearGradient id="streamGold" x1="330" y1="240" x2="600" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#E5BA23"/>
          <stop offset="50%" stop-color="#E8BE29"/>
          <stop offset="85%" stop-color="#D7CA2B"/>
          <stop offset="100%" stop-color="#BACD26"/>
        </linearGradient>
        <linearGradient id="streamHighlight" x1="330" y1="240" x2="600" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="#FFFAD0" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="transparent"/>
        </linearGradient>
      </defs>
      <!-- Glow halo -->
      <path d="M 270,277 Q 440,310 600,316" stroke="#FFDF60" stroke-width="8" opacity="0.35" stroke-linecap="round"/>
      <!-- Core stream -->
      <path d="M 270,277 Q 440,310 600,316" stroke="url(#streamGold)" stroke-width="6" stroke-linecap="round"/>
      <!-- Specular Highlight -->
      <path d="M 269,276 Q 439,309 599,315" stroke="url(#streamHighlight)" stroke-width="2" stroke-linecap="round"/>
    </svg>

    <!-- Cup -->
    <div class="cup-wrap">
      <svg width="100%" height="100%" viewBox="0 0 280 240" fill="none" style="filter: drop-shadow(0 24px 35px rgba(35,46,26,0.22));">
        <defs>
          <radialGradient id="cupClay" cx="45%" cy="38%" r="62%">
            <stop offset="0%" stop-color="#FDFBF7"/>
            <stop offset="60%" stop-color="#ECE3D2"/>
            <stop offset="90%" stop-color="#CEBFA6"/>
            <stop offset="100%" stop-color="#B8A78C"/>
          </radialGradient>
          <radialGradient id="oilPool" cx="42%" cy="45%" r="56%">
            <stop offset="0%" stop-color="#FFF280"/>
            <stop offset="30%" stop-color="#E8BE23"/>
            <stop offset="70%" stop-color="#BACD26"/>
            <stop offset="100%" stop-color="#7B9214"/>
          </radialGradient>
          <linearGradient id="oilSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
            <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="transparent"/>
          </linearGradient>
        </defs>
        <!-- Ceramic Cup Outer Body -->
        <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 C 215,96 65,96 40,85 Z" fill="url(#cupClay)" stroke="#B8A78C" stroke-width="1.8"/>
        <!-- Cup Rim Outer Ellipse -->
        <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="#fff" stroke-width="2.5"/>
        <!-- Pool of Golden Olive Oil -->
        <ellipse cx="140" cy="86" rx="92" ry="32" fill="url(#oilPool)"/>
        <!-- Caustics & Reflection Rings -->
        <ellipse cx="140" cy="86" rx="72" ry="23" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <!-- Expanding Ripples -->
        <circle cx="140" cy="86" r="14" fill="none" stroke="rgba(255,248,180,0.8)" stroke-width="2" class="ripple-ring"/>
        <circle cx="140" cy="86" r="26" fill="none" stroke="rgba(255,248,180,0.5)" stroke-width="1.5" class="ripple-ring"/>
        <!-- Specular Sheen Arc -->
        <path d="M 75,76 Q 140,96 205,76" stroke="url(#oilSheen)" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Impact Point -->
        <circle cx="140" cy="86" r="5" fill="#FFFFFF"/>
      </svg>
    </div>

    <!-- Floating Pills -->
    <div class="spec-pill" style="top: 25px; left: 60px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2D3624" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Chef Squeeze Nozzle</span>
    </div>
    <div class="spec-pill" style="top: 45px; right: 80px;">
      <span style="color:#C69F1B; font-weight:800;">✦</span>
      <span>Cold-Pressed &lt; 24h</span>
    </div>
    <div class="spec-pill" style="bottom: 35px; left: 160px; background:#F8F4EA;">
      <span>100% Spanish Picual</span>
    </div>

    <!-- Orbiting Leaves -->
    <svg style="position:absolute; top:25px; right:350px; width:48px;" viewBox="0 0 60 70" fill="none">
      <path d="M 10,65 Q 25,30 55,5 Q 40,40 10,65 Z" fill="#6A8042"/>
    </svg>
    <svg style="position:absolute; bottom:60px; right:60px; width:56px;" viewBox="0 0 70 80" fill="none">
      <path d="M 65,10 Q 35,45 10,75 Q 45,55 65,10 Z" fill="#758E4A"/>
    </svg>
    <svg style="position:absolute; top:120px; right:140px; width:26px;" viewBox="0 0 32 38" fill="none">
      <ellipse cx="16" cy="19" rx="14" ry="17" fill="#7E9646"/>
      <ellipse cx="12" cy="14" rx="4" ry="7" fill="#A4BE68" opacity="0.75"/>
    </svg>
  </div>
</body>
</html>
`;

fs.writeFileSync('test_pour_exact.html', html, 'utf8');
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --window-size=960,620 --screenshot="${path.join(artDir, 'pour_exact_v2.png')}" http://127.0.0.1:3000/test_pour_exact.html`, { stdio: 'inherit' });
console.log('pour_exact_v2.png captured!');
