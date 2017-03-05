

module.exports = function (opts) {
  var x = opts.loc.x;
  var y = opts.loc.y;

  return {
    id: `${x}-${y}`,
    color: opts.color,
    weight: 1
  };
};
