const { spawn, execSync } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Starting Next.js on port 3009...');
  const server = spawn('cmd.exe', ['/c', 'npx', 'next', 'start', '-p', '3009'], { stdio: 'pipe' });

  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((res, rej) => {
        const req = http.get('http://127.0.0.1:3009/', r => { if (r.statusCode === 200) res(); else rej(); });
        req.on('error', rej);
        req.setTimeout(500, () => req.destroy());
      });
      break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9333;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1440,1000'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const versionData = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/version`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const ws = new WebSocket(versionData.webSocketDebuggerUrl);
  await new Promise(res => ws.onopen = res);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  // Create new target / page
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const pageWs = new WebSocket(`ws://127.0.0.1:${port}/devtools/page/${target.targetId}`);
  await new Promise(res => pageWs.onopen = res);

  function sendPage(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          pageWs.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      pageWs.addEventListener('message', handler);
      pageWs.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendPage('Page.enable');
  await sendPage('Runtime.enable');

  pageWs.addEventListener('message', (e) => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.consoleAPICalled') {
      console.log('BROWSER CONSOLE:', d.params.type, d.params.args.map(a => a.value || a.description));
    }
    if (d.method === 'Runtime.exceptionThrown') {
      console.error('BROWSER ERROR:', d.params.exceptionDetails.text, d.params.exceptionDetails.exception?.description);
    }
  });

  console.log('Navigating to http://127.0.0.1:3009/ ...');
  await sendPage('Page.navigate', { url: 'http://127.0.0.1:3009/' });
  await new Promise(r => setTimeout(r, 3000));

  const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\10b634d0-c585-42b1-aaa4-f2f1d96bf56d';

  // 1. Capture Products section
  await sendPage('Runtime.evaluate', { expression: 'window.scrollTo(0, 1100)' });
  await new Promise(r => setTimeout(r, 1000));
  let res = await sendPage('Page.captureScreenshot');
  fs.writeFileSync(path.join(artDir, 'section_products.png'), Buffer.from(res.data, 'base64'));
  console.log('Saved section_products.png');

  // 2. Scroll to #about-srsti
  const aboutY = await sendPage('Runtime.evaluate', { expression: 'document.getElementById("about-srsti") ? document.getElementById("about-srsti").offsetTop : -1' });
  console.log('about-srsti offsetTop:', aboutY.result.value);
  if (aboutY.result.value > 0) {
    await sendPage('Runtime.evaluate', { expression: `window.scrollTo(0, ${aboutY.result.value - 50})` });
    await new Promise(r => setTimeout(r, 1000));
    res = await sendPage('Page.captureScreenshot');
    fs.writeFileSync(path.join(artDir, 'section_about_mascot.png'), Buffer.from(res.data, 'base64'));
    console.log('Saved section_about_mascot.png');
  }

  // 3. Scroll to funfact
  const ff = await sendPage('Runtime.evaluate', { expression: 'document.getElementById("shopify-section-template--16889120686294__text_carousel_9TqPXk") ? document.getElementById("shopify-section-template--16889120686294__text_carousel_9TqPXk").offsetTop : -1' });
  console.log('funfact offsetTop:', ff.result.value);
  if (ff.result.value > 0) {
    await sendPage('Runtime.evaluate', { expression: `window.scrollTo(0, ${ff.result.value - 50})` });
    await new Promise(r => setTimeout(r, 1500));
    res = await sendPage('Page.captureScreenshot');
    fs.writeFileSync(path.join(artDir, 'section_funfact.png'), Buffer.from(res.data, 'base64'));
    console.log('Saved section_funfact.png');
  }

  // 4. Check lottie-player element state
  const lottieState = await sendPage('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('lottie-player');
        if (!el) return { found: false };
        return {
          found: true,
          src: el.getAttribute('src'),
          hasShadowRoot: !!el.shadowRoot,
          shadowHTML: el.shadowRoot ? el.shadowRoot.innerHTML.substring(0, 300) : null,
          customElementRegistered: !!customElements.get('lottie-player'),
          clientWidth: el.clientWidth,
          clientHeight: el.clientHeight
        };
      })()
    `,
    returnByValue: true
  });
  console.log('LOTTIE PLAYER STATE:', JSON.stringify(lottieState.result.value, null, 2));

  chromeProc.kill();
  server.kill();
  console.log('Finished capturing!');
}

run();
