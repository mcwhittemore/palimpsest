#!/usr/bin/env node

const path = require('path');

const openSeries = require('../lib/open-series');
const saveImage = require('../lib/save');
const palimpsest = require('../index');

// 2 = indexer
// 3 = image glob
// 4 = output

const indexName = process.argv[2];
const localName = path.resolve(indexName);
let indexer = null;
try {
  indexer = require(localName);
}
catch (err) {
  try {
    indexer = require(`../process/${indexName}`);
  }
  catch (err) {
    throw new Error('Cannot find indexer');
  }
}

const numInputs = process.argv.length;
const seriesFiles = process.argv.slice(3, numInputs-1);

const loc = path.resolve(process.argv[numInputs-1]);

runner().catch(err => { console.log(err); });

async function runner() {
  console.log(`Opening images`);
  const series = await openSeries(seriesFiles);     
  console.log(`Indexing ${series.length} images with ${indexName}`);
  const img = await palimpsest(series, indexer);
  console.log('Saving image');
  await saveImage(img, loc);
  console.log(`Ready: ${loc}`);
};
