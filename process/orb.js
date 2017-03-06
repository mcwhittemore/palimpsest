module.exports = function(opts) {
  const width = opts.about.width;
  const height = opts.about.height;
  const min = (Math.min(width, height) / 2) * .66;
  const gap = (Math.min(width, height) / 2) * .75;

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
    // TODO: weight early pictures to the left and later pictures to the right
    weight = opts.loc.s === 0 ? 100 : 1;
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
