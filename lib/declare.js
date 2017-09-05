var each = require('./each');

module.exports = function(output, hooks) {
  var index = {};
  index.hooks = hooks;
  index.colorsByKey = new Map();
  index.countsByKey = new Map();

  console.log(`----> declaring keys`);
  each([output], function(opts) {
    var key = index.hooks.declare(opts);
    index.colorsByKey.set(key, [0, 0, 0]);
    index.countsByKey.set(key, 0);
  });

  return index;
};
