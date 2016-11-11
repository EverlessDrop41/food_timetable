var models = require("./models");
var auth = require("./auth");
var config = require("./config/config").app;

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

module.exports = function (is_production, callback) {
	console.log("Initializing Database");
	//Sync the db and if in dev generate sample data
	models.sequelize.sync({ force: !is_production }).then(function(err) {
	 	console.log('Connection has been established successfully.');
	  //models.Food.sync({ force: !is_prod });
	  //models.Course.sync({ force: !is_prod });

	 	auth.password.register("admin", config.admin_pass, true, function (success, user, error) {
			if (success) {
				console.log("Created admin user");
			} else {
				console.log("Failed to create an admin user");
			}
		});

		if (!is_production) {
	    	models.Food.create({ name: "Pasta", price: 150 }).then(function (pasta) {
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
		            callback(true);
		          });
		        }).catch(function (error) {
		          console.error(error);
		          //logSqlizeError(error);
		        });
		    }).error(function (e) {
		        logSqlizeError(e);
			    callback(false);
		    });
		}

	}).catch(function (err) {
	  console.log('Unable to connect to the database:', err);
	  callback(false);
	});

	if (is_production) {
		//Make an admin user and log it
		callback(true);
	}
}