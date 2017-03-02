var each = require('./each');

module.exports = function(series, indexer) {
  var index = {};
  index.toId = indexer;
  index.data = new Map();
  var counts = new Map();

  var onImg = 0;
  each(series, function(x, y, r, g, b) {
    if (x === 0 && y === 0) {
      onImg++;
      console.log(`--> pre-indexing img ${onImg}`);
    }
    var id = index.toId(x, y, r, g, b);      
    counts.set(id, (counts.get(id) || 0) + 1);
  });

  var onImg = 0;
  each(series, function(x, y, r, g, b) {
    if (x === 0 && y === 0) {
      onImg++;
      console.log(`--> indexing img ${onImg}`);
    }
    var id = index.toId(x, y, r, g, b);
    var v = index.data.get(id) || [0, 0, 0];
    v[0] += r / counts.get(id);
    v[1] += g / counts.get(id);
    v[2] += b / counts.get(id);
    index.data.set(id, v);
  });

  each(series, function(x, y, r, g, b) {
    if (x === 0 && y === 0) {
      onImg++;
      console.log(`--> post-indexing img ${onImg}`);
    }
    var id = index.toId(x, y, r, b, b);
    var v = index.data.get(id).map(n => Math.floor(n));
    index.data.set(id, v);
  });

  return index;
};

