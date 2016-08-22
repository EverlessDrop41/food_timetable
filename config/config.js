var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || 3306;
var db_name = process.env.DB_NAME || 'food_timetable';

module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": db_name + "_dev",
    "host": db_host,
    "port": db_port,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": db_name + "_test",
    "host": db_host,
    "port": db_port,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": db_name + "_prod",
    "host": db_host,
    "port": db_port,
    "dialect": "mysql"
  }
}
