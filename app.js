var express = require('express');
var app = express();

db = require("./models");

db.sequelize.authenticate().then(function(err) {
  console.log('Connection has been established successfully.');
  db.sequelize.sync();
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
});

app.get('/', function (req, res) {
  res.send('Food timetable App');
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
