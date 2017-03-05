var each = require('./each');

module.exports = function(series, indexer) {
  var index = {};
  index.toId = indexer;
  index.data = new Map();
  var counts = new Map();

  var lastImg = -1;
  each(series, function(opts) {
    if (opts.loc.s !== lastImg) {
      console.log(`----> preindexing ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var id = index.toId(opts);
    counts.set(id, (counts.get(id) || 0) + 1);
  });

  each(series, function(opts) {
    if (opts.loc.s !== lastImg) {
      console.log(`----> indexing ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var id = index.toId(opts);
    var v = index.data.get(id) || [0, 0, 0];
    v[0] += opts.color.r / counts.get(id);
    v[1] += opts.color.g / counts.get(id);
    v[2] += opts.color.b / counts.get(id);
    index.data.set(id, v);
  });


  each([series[0]], function(opts) {
    var id = index.toId(opts);
    var v = index.data.get(id).map(n => Math.floor(n));
    index.data.set(id, v);
  });

  return index;
};

