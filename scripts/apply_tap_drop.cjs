const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Insert the tap drop inside template v-slot:olive
const tapDropMarkup = `
<div class="tap-drop-nozzle absolute pointer-events-none" style="right: 8%; top: 74%; z-index: 60;">
  <svg width="20" height="36" viewBox="0 0 24 44" fill="none" class="animate-tap-drip">
    <path d="M23.2348 18.1273C23.3165 17.964 23.1532 17.719 23.0715 17.5557C22.6633 16.1677 22.2551 14.6981 21.7652 13.31C21.1936 11.6771 20.7854 9.88085 19.9689 8.32954C19.3157 7.02317 14.7434 -0.161875 13.3554 0.899548C12.9472 1.22614 5.59885 10.0442 2.74117 20.3318C2.00634 22.8629 0.944913 25.3939 1.10821 27.7617C0.455026 31.191 1.35318 34.1303 2.41461 37.0696C3.14944 39.1925 5.02732 40.4172 6.57863 41.8868C7.39511 42.6217 8.37489 43.0299 9.43631 43.1115C10.2528 43.1932 10.9876 43.4382 11.7224 43.4382C12.9472 43.6014 14.3352 44.0097 15.315 42.6217C15.4783 42.3767 16.0498 42.295 16.3764 42.1318C17.1929 41.7235 18.0093 41.3153 18.8258 40.907C19.1524 40.7437 19.6423 40.5805 19.6423 40.1722C19.7239 39.4374 20.2138 39.0291 20.7037 38.6209C22.0917 37.3962 22.3367 35.5183 23.1531 33.967C22.7449 32.0891 23.4798 30.2112 23.6431 28.3333C23.8064 25.8838 24.0513 23.4344 23.5614 20.985C23.3981 20.0868 22.8266 19.1887 23.2348 18.1273Z" fill="#3C422E"/>
  </svg>
</div>
`;

if (!html.includes('tap-drop-nozzle')) {
  html = html.replace('</svg></template>', `</svg>${tapDropMarkup}</template>`);
  console.log('Inserted tap-drop-nozzle into slot:olive');
}

// 2. Add the animation styles into the head
const tapStyles = `
<style>
  @keyframes tapDripAnim {
    0% {
      opacity: 0;
      transform: translateY(0) scale(0.2);
    }
    20% {
      opacity: 1;
      transform: translateY(3px) scale(0.7);
    }
    50% {
      opacity: 1;
      transform: translateY(18px) scale(1, 1.2);
    }
    80% {
      opacity: 0.9;
      transform: translateY(50px) scale(0.85, 1.4);
    }
    100% {
      opacity: 0;
      transform: translateY(90px) scale(0.5, 1.6);
    }
  }
  .animate-tap-drip {
    animation: tapDripAnim 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
    transform-origin: top center;
    filter: drop-shadow(0 4px 8px rgba(60, 66, 46, 0.4));
  }
  #intro-drop {
    z-index: 9999 !important;
    pointer-events: none !important;
  }
  #intro-drop svg {
    width: 26px !important;
    height: 48px !important;
    filter: drop-shadow(0 6px 12px rgba(60, 66, 46, 0.45)) !important;
  }
  .pin-spacer {
    z-index: 9998 !important;
  }
</style>
`;

if (!html.includes('tapDripAnim')) {
  html = html.replace('</head>', `${tapStyles}\n</head>`);
  console.log('Inserted tapDripAnim styles into head');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html successfully!');
