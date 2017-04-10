const ndarray = require('ndarray');

const declare = require('./lib/declare');
const allocate = require('./lib/allocate');
const assign = require('./lib/assign');
const paint = require('./lib/paint');

var api = module.exports = function(output, series, indexer) {
  // create the index and set default values for index.counts and index.data
  var index = declare(output, indexer);

  // tally up the total value for each key in index.counts
  allocate(series, index);

  // create the color values for each key in index.data
  assign(series, index);

  // make sure the colors are ints not floats
  console.log('----> normalize');
  index.data.forEach((v, k) => {
    index.data.set(k, v.map(n => Math.floor(n)));
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


