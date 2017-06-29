var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var app = express();
var fs = require("fs");

models = require("./models");
var is_prod = process.env.IS_PROD || false;

//Add Logging
app.use(morgan('common', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Include Routes
app.use('/docs', express.static('apidoc'));
app.use('/api', require("./apiroutes"));

app.get('/', function (req, res) {
	res.send('for api docs visit <a href="/docs">here</a>')
})

//Get the desired port
var port = process.env.PORT || 5000;

var init_db = require("./init_db");
init_db(is_prod, function (successful) {
	if (successful) {
		app.listen(port, function () {
			console.log('Food Timetable app listening on port ' + port + '!');
		});
	} else {
		console.error("Failed to connect to database, not launching server");
	}
});

module.exports = app;
