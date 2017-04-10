
module.exports = function(series, fn) {
  var numSeries = series.length;
  var np = 100/numSeries;

  for (var i=0; i<numSeries; i++) {
    var width = series[0].shape[0];
    var height = series[0].shape[1];

    var yp = 100/height;
    var xp = 100/width;
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var r = series[i].get(x, y, 0);
        var g = series[i].get(x, y, 1);
        var b = series[i].get(x, y, 2);
        var obj = {};
        obj.color = {r, g, b};
        obj.loc = {x, y, s: i};
        obj.progress = {
          x: xp*x,
          y: yp*y,
          s: np*i
        };
        obj.about = {numSeries, width, height};
        fn(obj);
      }
    }
  }

}

