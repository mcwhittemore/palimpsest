var each = require('./each');

module.exports = function(output, indexer) {
  var index = {};
  index.toId = indexer;
  index.data = new Map();
  index.counts = new Map();

  console.log(`----> declaring keys`);
  each([output], function(opts) {
    opts.mode = 'declare';
    var pixel = index.toId(opts);
    var id = pixel.id;
    index.data.set(id, [0, 0, 0]);
    index.counts.set(id, 0);
  });

  return index;
};
