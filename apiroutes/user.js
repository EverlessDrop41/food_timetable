var express = require('express');
var router = express.Router();
var auth = require('../auth');
var models = require("../models");

/*
  Auth Testing methods
  The nest 2 methods are used to test out the auth middleware
*/
router.get('/secret', auth.middleware.is_admin, function (req, res) {
  res.send({
    admin: req.is_admin,
    credentials: req.credentials,
    auth_err: req.auth_err
  });
});

router.get('/supersecret', auth.middleware.require_admin, function (req, res) {
  res.send({
    admin: req.is_admin,
    credentials: req.credentials
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
