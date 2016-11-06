var express = require('express');
var router = express.Router();
var passwords = require('../auth').password; 

models = require("../models");

var passwordHashed = "$2a$10$xZBU0ONsinYUW1mSH5G2Bu5nk0lJQ3k8pwO6Mrczf4CZVrcTxgfvC";

router.get('/', function (req, res) {
  models.User.findAll().then(function(users) {
    res.send({ users: users });
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error")
  });
});

router.post('/register', function (req, res) {
	var uname = req.body.username;
	var pword = req.body.password;

	if (passwords.isValid(pword)) {
		//TODO: register user
		passwords.hash(pword, function (err, hash) {
			if (err) {
				res.send({ error: err });
			}
			else {
				res.send({ username: uname, hash: hash });
			}
		});
		
	}
	else {
		res.send("Invalid Password");
	}
});

router.post('/login', function (req, res) {
	var uname = req.body.username;
	var pword = req.body.password;

	if (passwords.isValid(pword)) {
		//TODO: register user
		passwords.isMatch(pword, passwordHashed, function (err, match) {
			if (err) {
				res.send({ error: err });
			}
			else {
				res.send({ username: uname, match: match });
			}
			
		});
		
	}
	else {
		res.send("Invalid Password");
	}
});

module.exports = router;
