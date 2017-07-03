module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      //In pence
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    category: {
      type: DataTypes.INTEGER
    },
    vegetarian: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vegan: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dairyFree: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    glutenFree: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });

  return Food;
};

/*
Food Category Id Match
null, not in expected range: Other
0: Main
2: Hot Ready To Go
3: Pasta Bar
4: Dessert
5: Drink

Extras theory:
CSV string in format NAME,EXTRACOST with each seperated by a semicolon
e.g. for pasta extras string is Cheese,20;Sauce,50;Cheese And Sauce,60
*/
