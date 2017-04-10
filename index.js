
const runIndexer = require('./lib/indexer');
const toImage = require('./lib/to-image');

module.exports = async function(output, series, indexer) {
  var index = await runIndexer(series, indexer);
  console.log('Compiling image');
  return toImage(output, index);
}

module.exports.open = require('./lib/open-series');
module.exports.save = require('./lib/save');


