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
  body { background: #FAF8F5; margin: 0; padding: 20px; font-family: sans-serif; display: flex; gap: 20px; }
  .card { position: relative; width: 420px; height: 460px; background: #fff; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; }
  .title { position: absolute; top: 10px; left: 15px; font-size: 13px; font-weight: bold; color: #333; z-index: 100; }
  
  /* Shared Cup */
  .cup-box {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    height: 180px;
    z-index: 5;
  }

  /* Option A: Tilted Pour from Top Left */
  .opt-a .bottle {
    position: absolute;
    top: 10px;
    left: 80px;
    width: 140px;
    height: 250px;
    transform-origin: 50% 12px;
    transform: rotate(135deg);
    filter: drop-shadow(-10px 15px 20px rgba(0,0,0,0.2));
    z-index: 10;
  }
  .opt-a .bottle img { width: 100%; height: 100%; object-fit: contain; }
  .opt-a .stream {
    position: absolute;
    top: 22px;
    left: 150px;
    width: 70px;
    height: 250px;
    z-index: 8;
  }

  /* Option B: Standing Hero Bottle Beside Cup with Pour Stream */
  .opt-b .bottle {
    position: absolute;
    top: 50px;
    left: 60px;
    width: 130px;
    height: 310px;
    transform: rotate(-10deg);
    filter: drop-shadow(0 20px 25px rgba(0,0,0,0.18));
    z-index: 10;
  }
  .opt-b .bottle img { width: 100%; height: 100%; object-fit: contain; }
  .opt-b .cup-box {
    left: 270px;
    bottom: 50px;
    width: 210px;
  }
  .opt-b .stream {
    position: absolute;
    top: 55px;
    left: 125px;
    width: 150px;
    height: 250px;
    z-index: 9;
  }

  /* Option C: Tilted Pour from Top Right */
  .opt-c .bottle {
    position: absolute;
    top: 10px;
    right: 80px;
    width: 140px;
    height: 250px;
    transform-origin: 50% 12px;
    transform: rotate(-135deg);
    filter: drop-shadow(10px 15px 20px rgba(0,0,0,0.2));
    z-index: 10;
  }
  .opt-c .bottle img { width: 100%; height: 100%; object-fit: contain; }
  .opt-c .stream {
    position: absolute;
    top: 22px;
    right: 150px;
    width: 70px;
    height: 250px;
    z-index: 8;
  }
</style>
</head>
<body>

  <!-- OPTION A -->
  <div class="card opt-a">
    <div class="title">Option A: Inverted Left Pour</div>
    <div class="bottle"><img src="/assets/images/bottle_1.png"></div>
    <svg class="stream" viewBox="0 0 70 250">
      <defs>
        <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E5BF28"/>
          <stop offset="100%" stop-color="#BACD28"/>
        </linearGradient>
      </defs>
      <path d="M 0,0 Q 30,120 60,240" stroke="url(#gA)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M 0,0 Q 30,120 60,240" stroke="#FFF7A8" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
    <div class="cup-box">
      <svg width="100%" height="100%" viewBox="0 0 280 240">
        <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="#C5B59A" stroke-width="2.5"/>
        <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 Z" fill="#EBE3D3" stroke="#BFAF96" stroke-width="2"/>
        <ellipse cx="140" cy="86" rx="92" ry="32" fill="#D4BA24"/>
      </svg>
    </div>
  </div>

  <!-- OPTION B -->
  <div class="card opt-b">
    <div class="title">Option B: Standing Duo (Bottle + Cup Pour)</div>
    <div class="bottle"><img src="/assets/images/bottle_1.png"></div>
    <svg class="stream" viewBox="0 0 150 250">
      <defs>
        <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E5BF28"/>
          <stop offset="100%" stop-color="#BACD28"/>
        </linearGradient>
      </defs>
      <!-- Stream pours from top into cup, with bottle proudly standing beside -->
      <path d="M 90,0 Q 90,100 90,200" stroke="url(#gB)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M 90,0 Q 90,100 90,200" stroke="#FFF7A8" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
    <div class="cup-box">
      <svg width="100%" height="100%" viewBox="0 0 280 240">
        <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="#C5B59A" stroke-width="2.5"/>
        <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 Z" fill="#EBE3D3" stroke="#BFAF96" stroke-width="2"/>
        <ellipse cx="140" cy="86" rx="92" ry="32" fill="#D4BA24"/>
      </svg>
    </div>
  </div>

  <!-- OPTION C -->
  <div class="card opt-c">
    <div class="title">Option C: Inverted Right Pour</div>
    <div class="bottle"><img src="/assets/images/bottle_1.png"></div>
    <svg class="stream" viewBox="0 0 70 250">
      <defs>
        <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E5BF28"/>
          <stop offset="100%" stop-color="#BACD28"/>
        </linearGradient>
      </defs>
      <path d="M 70,0 Q 40,120 10,240" stroke="url(#gC)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M 70,0 Q 40,120 10,240" stroke="#FFF7A8" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
    <div class="cup-box">
      <svg width="100%" height="100%" viewBox="0 0 280 240">
        <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="#C5B59A" stroke-width="2.5"/>
        <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 Z" fill="#EBE3D3" stroke="#BFAF96" stroke-width="2"/>
        <ellipse cx="140" cy="86" rx="92" ry="32" fill="#D4BA24"/>
      </svg>
    </div>
  </div>

</body>
</html>
`;

fs.writeFileSync('test_pour_options.html', html, 'utf8');
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --window-size=1350,520 --screenshot="${path.join(artDir, 'pour_options.png')}" http://127.0.0.1:3000/test_pour_options.html`, { stdio: 'inherit' });
console.log('Tested pour options!');
