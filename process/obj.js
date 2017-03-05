module.exports = function(x, y, r, g, b, xp, yp) {
  var xd = Math.abs(xp - 50);
  var yd = Math.abs(yp - 50);
  
  var cd = Math.pow((xd*xd)+(yd*yd), .5);

  var td = Math.floor(cd);

  if (td>30) return `${x}-${y}`;



  
  return `${td}`;

}
