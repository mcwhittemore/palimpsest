const fs = require('fs');
const getPixels = require('get-pixels');
const path = require('path');

module.exports = async function(seriesPath) {
  var files = await getFilePaths(seriesPath);
  var series = [];
  for (var i=0; i<files.length; i++) {
    series.push(await openImage(files[i]));
  }
  return series;
};

function getFilePaths(seriesPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(seriesPath, (err, files) => err ? reject(err) : resolve(files.map(f => path.join(seriesPath, f))));      
  });
};

function openImage(imagePath) {
  return new Promise((resolve, reject) => {
    getPixels(imagePath, (err, img) => err ? reject(err) : resolve(img));
  });
}
