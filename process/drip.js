
var drips = {};
var width = 1;
var height = 1;
var area = width * height;

var stages = ['preindex', 'index', 'paint', 'paint'];
var pos = -1;
var tool = {};

module.exports = function(opts) {
  if (opts.loc.x === 0 && opts.loc.y === 0 && opts.loc.s === 0) {
    reset();
    pos++;
  }
  var stage = stages[pos];
  var out = {};
  out.id = `${opts.loc.x}-${opts.loc.y}`;
  out.weight = 1;
  out.color = tool[stage](opts) || opts.color;
  return out;
};
var lastDrip = null;

tool.preindex = function(opts) {
  var drip = getDripId(opts); 
  if (lastDrip !== null && lastDrip.id !== drip.id) mergeDrips(lastDrip.s, lastDrip.x, lastDrip.y);
  var s = drip.s;
  drips[drip.x] = drips[drip.x] || {};
  var v = drips[drip.x][drip.y] || { r: 0, g: 0, b: 0, l: 0, s: 0};
  v.r += opts.color.r / area;
  v.g += opts.color.g / area;
  v.b += opts.color.b / area;
  drips[drip.x][drip.y] = v;
  lastDrip = drip;
};

tool.index = function(opts) {
  var drip = getDripId(opts); 
  var s = drip.s;
  var v = drips[drip.x][drip.y];

  var pos = Math.floor(v.l / opts.about.numSeries);
  var len = Math.floor(v.s / opts.about.numSeries);
  if (pos === 0 || len < 20) return opts.color;
  
  var h = opts.about.height;

  var rr = 255/(h/20);
  var gg = 255/(h/5);
  var bb = 255/(h/10);

  return {
    r: Math.max(0, Math.min(255-(pos*rr), 255)),
    g: Math.max(0, Math.min(255-(pos*gg), 255)),
    b: Math.max(0, Math.min(255-(pos*bb), 255))
  };
};

tool.paint = function() {}

function getDripId (opts) {
  var x = ''+Math.floor(opts.loc.x / width);
  var y = ''+Math.floor(opts.loc.y / height);
  return {x, y, id: `${x}-${y}`, s: opts.loc.s};
};

function reset() {
  var stage = stages[pos];
  if (stage === 'preindex') mergeDrips(lastDrip.s, lastDrip.x, lastDrip.y);
  lastDrip = null;
};

function mergeDrips(s, x, y) {
  var last = 0;
  if (drips[x] && drips[x][y-1]) last = drips[x][y-1].l;

  var d = drips[x][y];
  var r = d.r;
  var g = d.g;
  var b = d.b;

  var t = (r+g+b) / 3;
  if (t < g) {
    d.l = last + 1;
    for (var k=y-1; k>=0; k--) {
      if (drips[x][k].l === 0) break;
      drips[x][k].s = d.l;
    }
  }
}



