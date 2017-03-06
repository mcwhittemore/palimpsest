#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const openSeries = require('../lib/open-series');
const quit = require('../lib/quit');
const saveImage = require('../lib/save');
const palimpsest = require('../index');

// 2 = indexer
// 3 = output
// 4 = image glob

const indexName = process.argv[2] || '--help';

if (indexName === '--help') quit(fs.readFileSync(path.join(__dirname, './cli.help')).toString());

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
    quit('Cannot load the indexer');
  }
}

const outputFile = path.resolve(process.argv[3]);
if (outputFile === undefined) quit('You must provide a path for the output');
const seriesFiles = process.argv.slice(4);
if (seriesFiles.length === 0) quit('You must provide at least one source image');

runner().catch(err => { console.log(err); });

async function runner() {
  console.log(`Opening images`);
  const series = await openSeries(seriesFiles);     
  console.log(`Indexing ${series.length} images with ${indexName}`);
  const img = await palimpsest(series, indexer);
  console.log('Saving image');
  await saveImage(img, outputFile);
  console.log(`Ready: ${outputFile}`);
};
