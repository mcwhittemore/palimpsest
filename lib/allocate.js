var each = require('./each');

module.exports = function(series, index) {

  var lastImg = -1;

  each(series, function(opts) {
    opts.mode = 'allocate';
    if (opts.loc.s !== lastImg) {
      console.log(`----> allocate ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var pixel = index.toId(opts);
    var id = pixel.id;
    if (index.counts.has(id)) {
      index.counts.set(id, index.counts.get(id) + pixel.weight);
    }
  });

};


