const each = require('./each');
const ndarray = require('ndarray');

module.exports = function(baseImg, index) {
  var img = ndarray([], baseImg.shape, baseImg.stride);
  each([baseImg], function(x, y, r, g, b) {
    var id = index.toId(x, y, r, g, b);
    var colors = index.data.get(id);
    for(var c = 0; c<3; c++) {
      img.set(x, y, c, colors[c]);
    }
    if (baseImg.shape[2] === 4) img.set(x, y, 3, 1);
  });
  return img;
};

