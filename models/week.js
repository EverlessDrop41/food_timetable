module.exports = function(sequelize, DataTypes) {
  var Week = sequelize.define("Week", {
    name: {
      type: DataTypes.STRING
    }
  });

  return Week;
};

