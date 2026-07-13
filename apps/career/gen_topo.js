const fs = require('fs');
const patterns = require('hero-patterns');
const urlStr = patterns.topography('#000000', 1);
const svgStr = decodeURIComponent(urlStr.replace("url('data:image/svg+xml,", "").replace("')", ""));
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
fs.writeFileSync('public/topography.svg', svgStr);
