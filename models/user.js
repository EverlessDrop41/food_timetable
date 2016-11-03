module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      //In pence
      type: DataTypes.STRING(60),
      validate: {
        notNull: true
      }
    },
    is_admin: { //Admins can create + manage users
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
};
