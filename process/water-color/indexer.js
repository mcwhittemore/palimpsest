module.exports = function(opts) {
  var r = opts.color.r;
  var g = opts.color.g;
  var b = opts.color.b;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b) + 1;

  var l = max+opts.loc.x;
  var r = min+opts.loc.y;

  var m =  `${l}-${r}`;

  return {
    id: m,
    color: opts.color,
    weight: 1
  };
  
}
