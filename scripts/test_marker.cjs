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
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #FAF8F5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  .srsti-duo-stage {
    position: relative;
    width: 860px;
    height: 480px;
    background: #fff;
    border: 1px dashed #ccc;
    overflow: hidden;
  }
  .bottle {
    position: absolute;
    top: -20px;
    left: 80px;
    width: 250px;
    height: 460px;
    transform: rotate(126deg);
    filter: drop-shadow(-15px 22px 28px rgba(25, 35, 18, 0.24));
  }
  .bottle img { width: 100%; height: 100%; object-fit: contain; }
  .cup {
    position: absolute;
    bottom: 30px;
    left: 450px;
    width: 280px;
    height: 240px;
    z-index: 5;
  }
  .stream {
    position: absolute;
    top: 0;
    left: 0;
    width: 860px;
    height: 480px;
    pointer-events: none;
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="srsti-duo-stage">
    <div class="bottle"><img src="/assets/images/bottle_1.png"></div>
    <svg class="stream" viewBox="0 0 860 480">
      <!-- Test grid dots -->
      <circle cx="260" cy="275" r="4" fill="red"/>
      <circle cx="255" cy="265" r="4" fill="blue"/>
      <circle cx="250" cy="255" r="4" fill="green"/>
      <circle cx="590" cy="326" r="4" fill="purple"/>
      
      <!-- Test stream -->
      <path d="M 275,260 Q 430,270 590,296" stroke="#E5BA23" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M 275,260 Q 430,270 590,296" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>
    <div class="cup">
      <svg width="280" height="240" viewBox="0 0 280 240">
        <path d="M 40,85 C 45,160 85,215 140,215 C 195,215 235,160 240,85 Z" fill="#ECE3D2" stroke="#B8A78C" stroke-width="1.8"/>
        <ellipse cx="140" cy="85" rx="100" ry="38" fill="#E8DEC9" stroke="#fff" stroke-width="2.5"/>
        <ellipse cx="140" cy="86" rx="92" ry="32" fill="#D7CA2B"/>
        <circle cx="140" cy="86" r="6" fill="#fff"/>
      </svg>
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('test_marker.html', html, 'utf8');
execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --window-size=960,600 --screenshot="${path.join(artDir, 'marker.png')}" http://127.0.0.1:3000/test_marker.html`, { stdio: 'inherit' });
console.log('marker.png captured!');
