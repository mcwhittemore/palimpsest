const fs = require('fs');
const getPixels = require('get-pixels');
const path = require('path');

module.exports = async function(files) {
  var series = [];
  for (var i=0; i<files.length; i++) {
    console.log(files[i]);
    series.push(await openImage(files[i]));
  }
  return series;
};

function openImage(imagePath) {
  return new Promise((resolve, reject) => {
    getPixels(imagePath, (err, img) => err ? reject(err) : resolve(img));
  });
}
