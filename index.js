const path = require('path');

const openSeries = require('./lib/open-series');
const runIndexer = require('./lib/indexer');
const toImage = require('./lib/to-image');
const saveImage = require('./lib/save');

const indexName = process.argv[2];
const indexer = require(`./process/${indexName}/indexer`);

const seriesName = process.argv[3];
const seriesPath = path.resolve(seriesName);

const loc = path.join(__dirname, 'process', indexName, seriesName.replace(/\//g, '-')+'.jpg');

runner().catch(err => { console.log(err); });

async function runner() {
  console.log(`Opening images from: ${seriesName}`);
  var series = await openSeries(seriesPath);     
  console.log(`Indexing ${series.length} images with ${indexName}`);
  var index = await runIndexer(series, indexer);
  console.log('Compiling image');
  var img = toImage(series[0], index);
  console.log('Saving image');
  await saveImage(img, loc);
  console.log(`Ready: ${loc}`);
};

