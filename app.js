var express = require('express');
var app = express();

models = require("./models");
var is_prod = process.env.IS_PROD || false;
models.sequelize.authenticate().then(function(err) {
  console.log('Connection has been established successfully.');
  models.sequelize.sync({ force: !is_prod });
  //models.Food.sync({ force: !is_prod });
  //models.Course.sync({ force: !is_prod });

  if (!is_prod) {
    models.Course.create({
      name: "Week 1",
      FoodItems: [
        { name: "Pizza", price: 100 }
      ]
    }, {
      include: [{
        model: models.Food,
        as: "FoodItems"
      }]
    }).then(function(a) {
      console.log("Created sample");
    }).catch(function (error) {
      var length = error.message.length > error.sql.length ? error.message.length : error.sql.length;

      var equalStr = "";
      var dashStr = "";

      for (var i = 0; i < length; i++) {
        equalStr += "=";
        dashStr += "-";
      }

      console.error(equalStr);
      console.error("Error creating sample data");
      console.error(dashStr);
      console.error(error.message);
      console.error(dashStr);
      console.error(error.sql);
      console.error(equalStr);
    });
  }

}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

app.get('/', function (req, res) {
  models.Course.findAll({
    include: [{
      model: models.Food,
      as: "FoodItems"
    }]
  }).then(function(courses) {
    res.send(courses);
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error")
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
