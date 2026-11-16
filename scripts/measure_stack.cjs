const fs = require('fs');
const { execSync } = require('child_process');

const script = `
const out = {};
const stack = document.getElementById('srstiHeaderStack');
if (stack) {
  Array.from(stack.children).forEach((child, i) => {
    const r = child.getBoundingClientRect();
    out['child_' + i + '_' + child.className] = { height: Math.round(r.height), top: Math.round(r.top), bottom: Math.round(r.bottom) };
  });
}
console.log('STACK_CHILDREN:' + JSON.stringify(out));
`;

let html = fs.readFileSync('hero_test.html', 'utf8');
html = html.replace('</body>', `<script>${script}</script></body>`);
fs.writeFileSync('hero_test_stack.html', html);

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const res = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=1440,900 http://127.0.0.1:3000/hero_test_stack.html --enable-logging=stderr 2>&1`, { encoding: 'utf8' });
const idx = res.indexOf('STACK_CHILDREN:');
if (idx !== -1) {
  const end = res.indexOf('\n', idx);
  console.log(res.substring(idx, end !== -1 ? end : idx + 500));
}
