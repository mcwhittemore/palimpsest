const ndarray = require('ndarray');

const declare = require('./lib/declare');
const allocate = require('./lib/allocate');
const assign = require('./lib/assign');
const paint = require('./lib/paint');

var api = module.exports = function(output, series, hooks) {
  // create the index and set default values for index.countsByKey and index.colorsByKey
  var index = declare(output, hooks);

  // tally up the total value for each key in index.countsByKey
  allocate(series, index);

  // create the color values for each key in index.colorsByKey
  assign(series, index);

  // make sure the colors are ints not floats
  console.log('----> normalize');
  index.colorsByKey.forEach((v, k) => {
    index.colorsByKey.set(k, v.map(n => Math.floor(n)));
  });

  // apply the colors to the output
  console.log('----> paint');
  return paint(output, index);
}

api.open = require('./lib/open-series');
api.save = require('./lib/save');
api.make = function(w, h) {
  return ndarray([], [w, h, 3]);
};


