var each = require('./each');

module.exports = function(series, index) {
  var lastImg = -1;

  each(series, function(opts) {
    opts.mode = 'assign';
    if (opts.loc.s !== lastImg) {
      console.log(`----> assign ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var pixel = index.toId(opts);
    var id = pixel.id;
    if (index.data.has(id)) {
      var color = pixel.color;
      var v = index.data.get(id) || [0, 0, 0];
      v[0] += (color.r / index.counts.get(id)) * pixel.weight;
      v[1] += (color.g / index.counts.get(id)) * pixel.weight;
      v[2] += (color.b / index.counts.get(id)) * pixel.weight;
      index.data.set(id, v);
    }
  });
};

