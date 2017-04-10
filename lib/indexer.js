var each = require('./each');

module.exports = function(series, indexer) {
  var index = {};
  index.toId = indexer;
  index.data = new Map();
  var counts = new Map();

  var lastImg = -1;

  each(series, function(opts) {
    opts.mode = 'allocate';
    if (opts.loc.s !== lastImg) {
      console.log(`----> allocate ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var pixel = index.toId(opts);
    var id = pixel.id;
    counts.set(id, (counts.get(id) || 0) + pixel.weight);
  });

  each(series, function(opts) {
    opts.mode = 'assign';
    if (opts.loc.s !== lastImg) {
      console.log(`----> assign ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var pixel = index.toId(opts);
    var id = pixel.id;
    var color = pixel.color;
    var v = index.data.get(id) || [0, 0, 0];
    v[0] += (color.r / counts.get(id)) * pixel.weight;
    v[1] += (color.g / counts.get(id)) * pixel.weight;
    v[2] += (color.b / counts.get(id)) * pixel.weight;
    index.data.set(id, v);
  });

  index.data.forEach((v, k) => {
    index.data.set(k, v.map(n => Math.floor(n)));
  });

  return index;
};

