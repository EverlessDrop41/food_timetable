var express = require('express');
var app = express();

models = require("./models");
var is_prod = process.env.IS_PROD || false;

function logSqlizeError(error) {
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
}

models.sequelize.sync({ force: !is_prod }).then(function(err) {
  console.log('Connection has been established successfully.');
  //models.Food.sync({ force: !is_prod });
  //models.Course.sync({ force: !is_prod });

  if (!is_prod) {
    models.Food.create({ name: "Pasta", price: 150 })
      .then(function (pasta) {
        console.log("Created food: " + pasta);
        models.Course.create({
          name: "Week 1",
          Food: [
            { name: "Pizza", price: 100 }
          ]
        }, {
          include: [{
            model: models.Food,
            as: "Food"
          }]
        }).then(function(course) {
          console.log("Created sample");
          course.addFood(pasta).then(function () {
//success!
          });
        }).catch(function (error) {
          console.error(error);
          //logSqlizeError(error);
        });
      })
      .error(function (e) {
        logSqlizeError(e);
      });

  }

}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

app.use('/api', require("./routes"));

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
