
module.exports = function(series, fn) {
  var numSeries = series.length;
  var width = series[0].shape[0];
  var height = series[0].shape[1];

  for (var i=0; i<numSeries; i++) {
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var r = series[i].get(x, y, 0);
        var g = series[i].get(x, y, 1);
        var b = series[i].get(x, y, 2);
        fn(x, y, r, g, b);
      }
    }
  }

}

