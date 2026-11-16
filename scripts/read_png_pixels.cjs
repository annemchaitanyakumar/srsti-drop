const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const artDir = 'C:\\Users\\chait\\.gemini\\antigravity\\brain\\d3518a64-19fc-4826-9bd3-96f19ab7cfcf';

const buf = fs.readFileSync(path.join(artDir, 'scroll_1200px.png'));
// Find IDAT chunks
const idatChunks = [];
let offset = 8;
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.subarray(offset + 4, offset + 8).toString('ascii');
  if (type === 'IDAT') {
    idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}
const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);
console.log('Uncompressed IDAT length:', raw.length);
// Samples of RGB
const sample1 = [raw[1], raw[2], raw[3]];
const sampleMid = [raw[Math.floor(raw.length / 2)], raw[Math.floor(raw.length / 2) + 1], raw[Math.floor(raw.length / 2) + 2]];
console.log('Top left pixel:', sample1);
console.log('Mid pixel:', sampleMid);
