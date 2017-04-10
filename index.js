const ndarray = require('ndarray');
const runIndexer = require('./lib/indexer');
const toImage = require('./lib/to-image');

var api = module.exports = async function(output, series, indexer) {
  var index = await runIndexer(series, indexer);
  console.log('Compiling image');
  return toImage(output, index);
}

api.open = require('./lib/open-series');
api.save = require('./lib/save');
api.make = function(w, h) {
  return ndarray([], [w, h, 3]);
};


