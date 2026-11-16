const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

const html = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { background: #FAF8F5; margin: 0; padding: 20px; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; gap: 20px; }
  .box { position: relative; width: 620px; height: 620px; background: radial-gradient(circle 500px at 50% 40%, #FFFFFF 0%, #FAF8F5 60%, #F3EDE4 100%); border: 1px solid #ddd; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; align-items: center; }
  .title { position: absolute; top: 15px; left: 20px; font-size: 14px; font-weight: 700; color: #1F2718; z-index: 100; }
  
  .spec-pill {
    position: absolute;
    z-index: 15;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 700;
    color: #2D3624;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(60, 66, 46, 0.16);
    border-radius: 9999px;
    padding: 6px 14px;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
  }

  /* Variation 1: Centered Floating Bottle with Gold Pour Downward */
  .v1-stage {
    position: absolute;
    top: 60px;
    width: 100%;
    height: 540px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .v1-bottle {
    position: relative;
    width: 220px;
    height: 420px;
    z-index: 10;
    filter: drop-shadow(0 25px 35px rgba(25, 35, 18, 0.25));
  }
  .v1-bottle img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Variation 2: Tilted Bottle pouring into Cup below */
  .v2-stage {
    position: absolute;
    top: 50px;
    width: 100%;
    height: 550px;
  }
  .v2-bottle-tilt {
    position: absolute;
    top: 20px;
    left: 120px;
    width: 170px;
    height: 320px;
    transform: rotate(45deg);
    z-index: 10;
    filter: drop-shadow(15px 25px 30px rgba(25, 35, 18, 0.22));
  }
  .v2-bottle-tilt img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .v2-cup {
    position: absolute;
    bottom: 50px;
    right: 120px;
    width: 240px;
    height: 190px;
    z-index: 6;
  }
  .v2-stream {
    position: absolute;
    top: 155px;
    left: 260px;
    width: 100px;
    height: 200px;
    z-index: 8;
  }
</style>
</head>
<body>

  <!-- VARIATION 1 -->
  <div class="box">
    <div class="title">Variation 1: Levitating Bottle Showcase (Pure Hero)</div>
    <div class="v1-stage">
      <div class="v1-bottle">
        <img src="/assets/images/bottle_1.png" alt="Drizzle Bottle">
      </div>
      <div class="spec-pill" style="top: 30%; left: 80px;">Cold-Pressed &lt; 24h</div>
      <div class="spec-pill" style="top: 45%; right: 70px;"><span style="color:#C69F1B;">✦</span> Acidity &le; 0.2%</div>
      <div class="spec-pill" style="bottom: 25%; left: 90px; background:#F8F4EA;">100% Spanish Picual</div>

      <!-- Floating leaves -->
      <svg style="position:absolute; top:18%; left:120px; width:48px;" viewBox="0 0 60 70" fill="none">
        <path d="M 10,65 Q 25,30 55,5 Q 40,40 10,65 Z" fill="#6A8042"/>
      </svg>
      <svg style="position:absolute; top:28%; right:110px; width:42px;" viewBox="0 0 60 70" fill="none">
        <path d="M 5,10 Q 35,25 55,65 Q 25,45 5,10 Z" fill="#586E36"/>
      </svg>
      <svg style="position:absolute; bottom:22%; right:140px; width:26px;" viewBox="0 0 32 38" fill="none">
        <ellipse cx="16" cy="19" rx="14" ry="17" fill="#7E9646"/>
      </svg>
    </div>
  </div>

  <!-- VARIATION 2 -->
  <div class="box">
    <div class="title">Variation 2: Diagonal Pour into Tasting Cup</div>
    <div class="v2-stage">
      <div class="v2-bottle-tilt">
        <img src="/assets/images/bottle_1.png" alt="Drizzle Bottle">
      </div>
      <svg class="v2-stream" viewBox="0 0 100 200" fill="none">
        <defs>
          <linearGradient id="streamV2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E5BA23"/>
            <stop offset="50%" stop-color="#E8BE29"/>
            <stop offset="100%" stop-color="#BACD26"/>
          </linearGradient>
        </defs>
        <path d="M 15,10 Q 40,80 60,180" stroke="#FFDF60" stroke-width="8" opacity="0.35" stroke-linecap="round"/>
        <path d="M 15,10 Q 40,80 60,180" stroke="url(#streamV2)" stroke-width="6" stroke-linecap="round"/>
        <path d="M 14,10 Q 39,80 59,180" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      </svg>
      <div class="v2-cup">
        <svg width="100%" height="100%" viewBox="0 0 280 240" fill="none" style="filter: drop-shadow(0 20px 30px rgba(35,46,26,0.22));">
          <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 Z" fill="#ECE3D2" stroke="#B8A78C" stroke-width="1.8"/>
          <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="#fff" stroke-width="2"/>
          <ellipse cx="140" cy="86" rx="92" ry="32" fill="#D7CA2B"/>
          <circle cx="140" cy="86" r="10" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
          <circle cx="140" cy="86" r="5" fill="#fff"/>
        </svg>
      </div>
      <div class="spec-pill" style="top: 15%; right: 60px;">Chef Squeeze Tip</div>
      <div class="spec-pill" style="bottom: 22%; left: 70px;">First Cold Press &lt; 24h</div>
      <div class="spec-pill" style="bottom: 12%; right: 80px; background:#F8F4EA;">100% Single Origin</div>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('test_hero2_variations.html', html, 'utf8');
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --window-size=1300,700 --screenshot="${path.join(artDir, 'hero2_variations.png')}" http://127.0.0.1:3000/test_hero2_variations.html`, { stdio: 'inherit' });
console.log('Hero 2 variations captured!');
