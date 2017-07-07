module.exports = {
  poundStr: function(amt) {
    var pounds = Math.floor(amt / 100);
    var pennies = amt - pounds * 100;
    if (pennies < 10) {
      pennies = "0" + pennies;
    }
    return "£" + pounds + "." + pennies;
  }
}