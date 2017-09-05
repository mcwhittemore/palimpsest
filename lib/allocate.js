var each = require('./each');

module.exports = function(series, index) {

  var lastImg = -1;

  each(series, function(opts) {
    if (opts.loc.s !== lastImg) {
      console.log(`----> allocate ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    opts = index.hooks.transform ? index.hooks.transform(opts) : opts;
    var key = index.hooks.declare(opts);
    if (index.countsByKey.has(key)) {
      var weight = index.hooks.allocate(key, opts);
      index.countsByKey.set(key, index.countsByKey.get(key) + weight);
    }
  });

};


