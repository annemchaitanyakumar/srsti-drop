const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Received length:', data.length);
    console.log('Contains #intro-drop:', data.includes('#intro-drop'));
    console.log('Contains about-graza:', data.includes('about-graza'));
    console.log('Contains sizzle-drizzle:', data.includes('sizzle-drizzle-combo-pack'));
  });
}).on('error', console.error);
