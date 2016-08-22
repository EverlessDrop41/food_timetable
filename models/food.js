module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      //Is in pence
      type: DataTypes.INTEGER,
      defaultValue: 100
    }
  });

  return Food;
}
