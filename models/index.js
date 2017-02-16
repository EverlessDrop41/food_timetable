'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.js').database[env];
var db        = {};

var sequelize = null;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

var Course = db.Course;
var Food = db.Food;
var Week = db.Week

Food.belongsToMany(Course, { through: 'FoodCourseAssoc' });
Course.belongsToMany(Food, { through: "FoodCourseAssoc" });

Week.belongsTo(Course, { as: "Monday" });
Week.belongsTo(Course, { as: "Tuesday" });
Week.belongsTo(Course, { as: "Wednesday" });
Week.belongsTo(Course, { as: "Thursday" });
Week.belongsTo(Course, { as: "Friday" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
