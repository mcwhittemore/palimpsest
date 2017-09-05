var each = require('./each');

module.exports = function(series, index) {
  var lastImg = -1;

  each(series, function(opts) {
    if (opts.loc.s !== lastImg) {
      console.log(`----> assign ${opts.loc.s+1}`);
      lastImg = opts.loc.s;
    }
    var key = index.hooks.declare(opts);
    if (index.colorsByKey.has(key)) {
      var weight = index.hooks.allocate(key, opts);
      var totalWeight = index.countsByKey.get(key));
      var color = index.hooks.assign(key, weight, totalWeight, opts);
      var v = index.colorsByKey.get(key) || [0, 0, 0];
      v[0] += (color.r / totalWeight * weight);
      v[1] += (color.g / totalWeight * weight);
      v[2] += (color.b / totalWeight * weight);
      index.colorsByKey.set(key, v);
    }
  });
};

