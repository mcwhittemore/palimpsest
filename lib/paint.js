const each = require('./each');
const ndarray = require('ndarray');

module.exports = function(img, index) {
  var hasForth = img.shape[2] === 4;
  each([img], function(opts) {
    var x = opts.loc.x;
    var y = opts.loc.y;
    opts = index.hooks.transform ? index.hooks.transform(opts) : opts;
    var key = index.hooks.declare(opts);
    var colors = index.colorsByKey.get(key);
    for(var c = 0; c<3; c++) {
      img.set(x, y, c, colors[c]);
    }
    if (hasForth) img.set(x, y, 3, 1);
  });
  return img;
};

