var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || 3306;
var db_name = process.env.DB_NAME || 'food_timetable';
var db_user = process.env.DB_USER || 'root';
var db_pass = process.env.DB_PASSWORD || 'password';
var app_secret = process.env.APP_SECRET || 'super_secret_code' ;
var port = process.env.PORT || 3000;
var salt_rounds = process.env.SALT_ROUNDS || 10;
var admin_pass = process.env.ADMIN_PASS || "secure_password";
var env       = process.env.NODE_ENV || 'development';
var is_prod = env == 'production' || false;
var createSampleData = process.env.CREATE_SAMPLE_DATA_ON_STARTUP == 1 ? true : false;
var resetDb = process.env.RESET_DB_ON_STARTUP == 1 ? true : false;

module.exports = {
  "database": {
    "development": {
      "username": db_user,
      "password": db_pass,
      "database": db_name + "_dev",
      "host": db_host,
      "port": db_port,
      "dialect": "mysql"
    },
    "test": {
      "username": db_user,
      "password": db_pass,
      "database": db_name + "_test",
      "host": db_host,
      "port": db_port,
      "dialect": "mysql"
    },
    "production": {
      "username": db_user,
      "password": db_pass,
      "database": db_name + "_prod",
      "host": db_host,
      "port": db_port,
      "dialect": "mysql"
    }
  },
  "app": {
    "secret": app_secret,
    "port": port,
    "salt_rounds": salt_rounds,
    "admin_pass": admin_pass,
    "createSampleData": createSampleData,
    "resetDb": resetDb,
    "is_prod": is_prod,
    "env": env
  }
};
