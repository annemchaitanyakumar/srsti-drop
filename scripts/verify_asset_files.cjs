const fs = require('fs');

['drizzle_bottle.png', 'sizzle_bottle.png', 'bottle_1.png', 'real_3d_cup.png'].forEach(f => {
  const p = 'assets/images/' + f;
  const stat = fs.statSync(p);
  console.log(f, stat.size, 'bytes');
});
