var express = require('express');
var router = express.Router();
var auth = require('../auth'); 

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

	auth.password.register(uname, pword, false, function (success, user, error) {
		if (success) {
			res.send({success: true, user: user});
		} else {
			res.send({success: false, error: error});
		}
	});

	/*if (auth.password.isValid(pword)) {
		//TODO: register user
		auth.password.hash(pword, function (err, hash) {
			if (err) {
				res.send({ error: err });
			}
			else {
				models.User.create({
					name: uname,
					password: hash
				}).then(function (user) {
					console.log("User added");
					res.send({ 
						success: true, 
						user: {
							name: user.name,
							is_admin: user.is_admin
						} 
					});
				}); 
			}
		});
		
	}
	else {
		res.send("Invalid Password");
	}*/
});

router.post('/login', function (req, res) {
	var uname = req.body.username;
	var pword = req.body.password;

	if (auth.password.isValid(pword)) {
		//TODO: register user
		auth.password.isMatch(pword, passwordHashed, function (err, match) {
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
