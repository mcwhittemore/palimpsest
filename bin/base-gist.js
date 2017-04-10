var fs = require('fs');
var path = require('path');

var palimpsest = require('palimpsest');
var width = 640;
var height = 640;

function indexer(opts) {
  var x = Math.floor(opts.progress.x);
  var y = Math.floor(opts.progress.y);
  var id = `${x}-${y}`;
  return {
    id: id,
    color: opts.color,
    weight: 1
  }
};



/******************************************
 * Really... its probs best if you don't  *
 * edit below this comment block. I mean  *
 * you can and all, but its pretty boring *
 ******************************************/

var sourceDir = path.join(__dirname, 'source');
var files = fs.readdirSync(sourceDir).map(v => path.join(sourceDir, v));

runner().catch(err => console.log(err));

async function runner() {
  var output = palimpsest.make(width, height);
  var series = await palimpsest.open(files);
  output = await palimpsest(output, series, indexer);
  await palimpsest.save(output, path.join(__dirname, 'result.jpg'));
}

