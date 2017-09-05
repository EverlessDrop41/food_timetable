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

module.exports = function (callback) {
	console.log("Initializing Database");
	//Sync the db and if in dev generate sample data
	models.sequelize.sync({ force: config.resetDb }).then(function(err) {
	 	console.log('Connection has been established successfully.');
	  //models.Food.sync({ force: !is_prod });
	  //models.Course.sync({ force: !is_prod });

	 	auth.user.register("admin", config.admin_pass, true, function (success, user, error) {
			if (success) {
				console.log("Created admin user");
			} else {
				console.log("Failed to create an admin user");
				if (error.name != "SequelizeUniqueConstraintError") {
					console.error(error);
				}
			}
			console.log("crs: " + config.createSampleData);
			console.log("Create Sample Data: " + (config.createSampleData ? "yes" : "no"));
			console.log("reset: " + config.resetDb);
			console.log("Reset Database: " + (config.resetDb ? "yes" : "no"));
			console.log("Env reset: " + process.env.RESET_DB_ON_STARTUP + 
				" Env create sample data: " + process.env.CREATE_SAMPLE_DATA_ON_STARTUP);
			if (config.createSampleData) {
				//Make Food
				models.Food.create({ name: "Pasta", price: 150 }).then(function (pasta) {
						console.log("Created food: " + pasta);
						//Make The Course
						models.Course.create({
							name: "Monday 1",
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
								//Make the Week
								models.Week.create({
									name: "Week 1",
									MondayId: 1,
									TuesdayId: 1,
									WednesdayId: 1,
									ThursdayId: 1,
									FirdayId: 1
								}).then(function(week) {
									callback(true);
								}).catch(function (err) {
									//Week create error
									console.error(err);
									callback(false);
								});
							}).catch(function(e) { 
								//Pasta add error
								console.error(e);
								callback(false); 
							});
						}).catch(function (error) {
							//Course create error
							console.error(error);
							//logSqlizeError(error);
						});
				}).error(function (e) {
						logSqlizeError(e);
					callback(false);
				});
			} else {
				callback(true);
			}

		});

		

	}).catch(function (err) {
	  console.log('Unable to connect to the database:', err);
	  callback(false);
	});
}