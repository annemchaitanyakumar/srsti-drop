const fs = require('fs');

['bottle_1.png', 'bottle_2.png', 'bottle_3.png', 'drizzle_bottle.png', 'sizzle_bottle.png', 'real_3d_cup.png'].forEach(file => {
  const p = 'assets/images/' + file;
  if (!fs.existsSync(p)) {
    console.log(file, 'does not exist');
    return;
  }
  const stat = fs.statSync(p);
  console.log(file, stat.size, 'bytes');
});
