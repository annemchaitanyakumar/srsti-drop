const fs = require('fs');
const { execSync } = require('child_process');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

const html = `
<!DOCTYPE html>
<html>
<head>
<title>Wait</title>
</head>
<body>
<video id="v" src="/assets/dribbble_ref.mp4"></video>
<script>
  const v = document.getElementById('v');
  v.onloadedmetadata = () => {
    document.title = 'INFO_' + v.videoWidth + 'x' + v.videoHeight + '_' + v.duration;
  };
</script>
</body>
</html>
`;

fs.writeFileSync('vmeta.html', html, 'utf8');
const out = execSync(`${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --dump-dom http://127.0.0.1:3000/vmeta.html`).toString();
console.log('Result:', out.match(/<title>([^<]+)<\/title>/)?.[1]);
