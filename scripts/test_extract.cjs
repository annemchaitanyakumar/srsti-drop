const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\2637c6e3-6850-4b60-97a8-a1cb829e1363';

// HTML script that loads the video or frame, removes white background, and saves transparent PNGs of the cup and moss!
const html = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<canvas id="c"></canvas>
<script>
  const img = new Image();
  img.src = '/assets/dribbble_ref_frame.png'; // we will save a full res frame first
  img.onload = () => {
    console.log('Image loaded');
  };
</script>
</body>
</html>
`;
