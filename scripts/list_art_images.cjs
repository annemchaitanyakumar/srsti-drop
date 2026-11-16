const fs = require('fs');
const path = require('path');
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

['index_homepage_top.png', 'index_homepage_p35.png', 'index_homepage_p70.png', 'index_homepage_p100.png', 'scroll_0px.png', 'scroll_600px.png', 'scroll_1200px.png'].forEach(f => {
  const p = path.join(artDir, f);
  if (fs.existsSync(p)) {
    console.log(f.padEnd(25), fs.statSync(p).size, 'bytes');
  }
});
