const each = require('./each');
const ndarray = require('ndarray');

module.exports = function(baseImg, index) {
  var img = ndarray([], baseImg.shape, baseImg.stride);
  each([baseImg], function(opts) {
    var x = opts.loc.x;
    var y = opts.loc.y;
    var pixel = index.toId(opts);
    var id = pixel.id;
    var colors = index.data.get(id);
    for(var c = 0; c<3; c++) {
      img.set(x, y, c, colors[c]);
    }
    if (baseImg.shape[2] === 4) img.set(x, y, 3, 1);
  });
  return img;
};

