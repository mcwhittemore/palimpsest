var hooks = module.exports = {};

hooks.transform = function(opts) {
  let color = opts.color;
  let width = opts.about.width;
  let height = opts.about.height;
  let min = (Math.min(width, height) / 2) * .85;
  let gap = (Math.min(width, height) / 2) * .95;

  let mx = width / 2;
  let my = height / 2;
  
  let x = opts.loc.x;
  let y = opts.loc.y;
  let s = opts.loc.s;

  let xd = Math.abs(x - mx);
  let yd = Math.abs(y - my);
  
  let cd = Math.pow((xd*xd)+(yd*yd), .5);

  let numSeries = opts.about.numSeries;
  
  return { cd, min, mx, x, y, gap, color, s, numSeries};
}

hooks.declare = function(opts) {
  let x = opts.x;
  let y = opts.y;
  return `${x}-${y}`;
};

hooks.allocate = function(key, opts) {
  let weight = 1;
  let cd = opts.cd;
  let min = opts.min;
  let mx = opts.mx;
  let x = opts.x;
  let y = opts.y;
  let s = opts.s;
  let numSeries = opts.numSeries;

  if (cd<min) {
    var ppp = 4; // the number of pictures per slice in the orb
    var left = mx - min;
    var range = min * 2;
    id = `orb-${x}-${(y/(range/3))}`;
    var pp = range / numSeries;
    var pos = x - left;
    var slot = Math.floor(pos / pp);
    var rWeight = Math.abs(slot - s);
    weight = ppp - rWeight < 0 ? 0 : ppp - rWeight;
  }
  return weight;
};

hooks.assign = function(key, pixelWeight, keyWeight, opts) {
  let color = opts.color;
  let cd = opts.cd;
  let min = opts.min;
  let gap = opts.gap;
  // cd, min, gap
  if (cd > min && cd <= gap) {
    let scale = (.3 / (gap-min));
    let unit = ((cd-min)*scale) + .69;
    color.r = Math.floor(color.r*unit);
    color.g = Math.floor(color.g*unit);
    color.b = Math.floor(color.b*unit);
  }
  return color;
};

