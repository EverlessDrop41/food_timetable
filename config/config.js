var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || 3306;

module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "food_timetable_dev",
    "host": db_host,
    "port": db_port,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "food_timetable_test",
    "host": db_host,
    "port": db_port,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": "food_timetable_prod",
    "host": db_host,
    "port": db_port,
    "dialect": "mysql"
  }
}
