const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

// Let's create an evaluation script to measure layout
const evalHtml = `
<!DOCTYPE html>
<html>
<body>
<script>
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const data = {
      headerStack: document.getElementById('srstiHeaderStack')?.getBoundingClientRect(),
      bottlesRig: document.getElementById('srstiBottlesRig')?.getBoundingClientRect(),
      bottleDrizzle: document.getElementById('srstiBottleDrizzle')?.getBoundingClientRect(),
      bottleSizzle: document.getElementById('srstiBottleSizzle')?.getBoundingClientRect(),
      centerCup: document.getElementById('srstiCenterCup')?.getBoundingClientRect(),
      cardDrizzle: document.getElementById('srstiCardDrizzle')?.getBoundingClientRect(),
      cardSizzle: document.getElementById('srstiCardSizzle')?.getBoundingClientRect(),
      bottomHud: document.getElementById('srstiBottomHud')?.getBoundingClientRect()
    };
    console.log('METRICS:' + JSON.stringify(data));
  }, 500);
});
</script>
</body>
</html>
`;
fs.writeFileSync('temp_eval.html', evalHtml);
console.log('Ready to evaluate metrics.');
