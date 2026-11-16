const { execSync } = require('child_process');
const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

try {
  const res = execSync(`${chrome} --headless=new --no-sandbox --window-size=1440,900 http://127.0.0.1:3000/ --enable-logging=stderr 2>&1`, { timeout: 6000, encoding: 'utf8' });
  const logs = res.split('\n').filter(l => l.includes('CONSOLE') || l.includes('ERROR'));
  console.log('Console logs & errors:', logs.slice(0, 15));
} catch (e) {
  console.log('Exec output:', e.stdout || e.message);
}
