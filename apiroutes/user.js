var express = require('express');
var router = express.Router();
var auth = require('../auth');

models = require("../models");

var passwordHashed = "$2a$10$xZBU0ONsinYUW1mSH5G2Bu5nk0lJQ3k8pwO6Mrczf4CZVrcTxgfvC";

router.get('/secret', auth.middleware.is_admin, function (req, res) {
  res.send({
    admin: req.is_admin,
    credentials: req.credentials,
    auth_err: req.auth_err
  });
});

router.get('/', function (req, res) {
  models.User.findAll().then(function(users) {
    res.send({ users: users });
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error")
  });
});

router.post('/register', function (req, res) {

	var r_user = b_auth(req);

	var uname = req.body.username;
	var pword = req.body.password;


	if (auth.password.isValid(pword)) {
		auth.user.register(uname, pword, false, function (success, user, error) {
			if (success) {
				res.send({success: true, user: user});
			} else {
				res.send({success: false, error: error});
			}
		});
	} else {
		res.send({success: false, error: { message: "Invalid Password" }});
	}
});

const LOGIN_ERROR_MSG = "User not found or password is inccorect";

router.post('/login', function (req, res) {
	var uname = req.body.username;
	var pword = req.body.password;

	auth.user.findUser(uname, function (user) {
		if (user) {
			//Compare passwords
			auth.password.isMatch(pword, user.password, function (err, match) {
				if (!err && match) {
					res.send({ username: user.name, is_admin: user.is_admin });
				} else {
					res.send({ success: false, message: LOGIN_ERROR_MSG, error: err || undefined });
				}
			});
		} else {
			res.send({ success: false, message: LOGIN_ERROR_MSG });
		}
	});
});

module.exports = router;
