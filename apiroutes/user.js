var express = require('express');
var router = express.Router();
var auth = require('../auth');
var models = require("../models");

/*
  Auth Testing methods
  The nest 2 methods are used to test out the auth middleware
*/

/**
 * @api {get} /api/user/secret Get Secret
 * @apiName GetSecret
 * @apiDescription Get authenticated users details, test of is_admin
 * @apiGroup User
 *
 * @apiParam {String} Authorization BasicAuth credentials
 */
router.get('/secret', auth.middleware.is_admin, function (req, res) {
  res.send({
    admin: req.is_admin,
    credentials: req.credentials,
    auth_err: req.auth_err
  });
});

/**
 * @api {get} /api/user/supersecret Get Super Secret
 * @apiName GetSuperSecret
 * @apiDescription Require authenticated users details, test of require_admin
 * @apiGroup User
 *
 * @apiParam {String} Authorization BasicAuth credentials
 */
router.get('/supersecret', auth.middleware.require_admin, function (req, res) {
  res.send({
    admin: req.is_admin,
    credentials: req.credentials
  });
});

/**
 * @api {get} /api/user/ Get Users
 * @apiName GetUsers
 * @apiDescription Get all of the users, requires an authenticated user
 * @apiGroup User
 *
 * @apiParam {String} Authorization BasicAuth credentials
 */
router.get('/', auth.middleware.require_admin, function (req, res) {
  models.User.findAll().then(function(users) {
    res.send({ users: users });
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error")
  });
});

/**
 * @api {post} /api/user/register Register User
 * @apiName RegisterUser
 * @apiDescription Create a new user, requires an authenticated user
 * @apiGroup User
 *
 * @apiParam {String} Authorization BasicAuth credentials
 * @apiParam {String} username The username of the new user
 * @apiParam {String} password The password of the new user
 */
router.post('/register', auth.middleware.require_admin, function (req, res) {

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

/**
 * @api {post} /api/user/login Login
 * @apiName Login
 * @apiDescription A more polished way of getting user details
 * @apiGroup User
 *
 * @apiParam {String} Authorization BasicAuth credentials
 */
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
