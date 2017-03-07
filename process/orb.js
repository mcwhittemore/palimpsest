module.exports = function(opts) {
  const width = opts.about.width;
  const height = opts.about.height;
  const min = (Math.min(width, height) / 2) * .85;
  const gap = (Math.min(width, height) / 2) * .95;

  const mx = width / 2;
  const my = height / 2;
  
  const x = opts.loc.x;
  const y = opts.loc.y;

  const xd = Math.abs(x - mx);
  const yd = Math.abs(y - my);
  
  const cd = Math.pow((xd*xd)+(yd*yd), .5);

  let id = `${x}-${y}`;
  let weight = 1;
  let color = opts.color;

  if (cd<min) {
    var ppp = 4; // the number of pictures per slice in the orb
    var left = mx - min;
    var range = min * 2;
    id = `orb-${x}-${(y/(range/3))}`;
    var pp = range / opts.about.numSeries;
    var pos = x - left;
    var slot = Math.floor(pos / pp);
    var rWeight = Math.abs(slot - opts.loc.s);
    weight = ppp - rWeight < 0 ? 0 : ppp - rWeight;
  }

  // make the rim dark
  if (cd > min && cd <= gap) {
    let scale = (.3 / (gap-min));
    let unit = ((cd-min)*scale) + .69;
    color.r = Math.floor(color.r*unit);
    color.g = Math.floor(color.g*unit);
    color.b = Math.floor(color.b*unit);
  }

  return {
    id,
    color,
    weight
  };

}
