const http = require('http');
const { spawn } = require('child_process');

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          dataLength: data.length,
          preview: data.substring(0, 150)
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function run() {
  console.log('Starting Next.js server on port 3005...');
  const nextProcess = spawn('npx.cmd', ['next', 'start', '-p', '3005'], {
    shell: true,
    stdio: 'pipe'
  });

  nextProcess.stdout.on('data', (d) => process.stdout.write(d.toString()));
  nextProcess.stderr.on('data', (d) => process.stderr.write(d.toString()));

  // Wait 4 seconds for server to boot
  await new Promise(r => setTimeout(r, 4000));

  const urls = [
    'http://localhost:3005/',
    'http://localhost:3005/collections/all',
    'http://localhost:3005/products/the-trio',
    'http://localhost:3005/products/sizzle-drizzle-combo-pack',
    'http://localhost:3005/pages/about-us',
    'http://localhost:3005/pages/faqs',
    'http://localhost:3005/blogs/recipes',
    'http://localhost:3005/cart.json',
    'http://localhost:3005/assets/fonts.static.css',
    'http://localhost:3005/assets/bundle.css'
  ];

  console.log('\n--- Probing routes ---');
  for (const u of urls) {
    const res = await checkUrl(u);
    console.log(`[${res.status}] ${u} -> ${res.dataLength} bytes`);
  }

  console.log('\nStopping Next.js server...');
  nextProcess.kill('SIGINT');
  process.exit(0);
}

run();
