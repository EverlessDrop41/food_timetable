module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    name: { type: DataTypes.STRING }
  });

  return Course;
};
