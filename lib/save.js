var savePixels = require('save-pixels');
var fs = require('fs');

module.exports = function(img, loc) {
  return new Promise(function(resolve, reject) {
    var p = savePixels(img, 'jpg').pipe(fs.createWriteStream(loc));
    p.on('close', resolve);
    p.on('error', reject);
  });
}

