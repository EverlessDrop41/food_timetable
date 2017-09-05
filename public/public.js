var express = require('express');
var router = express.Router();
var auth = require('../auth');

router.get('/', function (req, res) {
	res.render("landing.nunj", req.session.templateData);
})

router.get('/week', function (req, res) {
	res.render("weekOverview.nunj", req.session.templateData);
});

router.get('/week/:id', function (req, res) {
	req.session.templateData.weekId = req.params.id;
	res.render("week.nunj", req.session.templateData);
});

router.get('/course', function (req, res) {
	res.render("courseOverview.nunj", req.session.templateData);
});

router.get('/course/:id', function (req, res) {
	req.session.templateData.courseId = req.params.id;
	res.render("course.nunj", req.session.templateData);
});

router.get('/food', function (req, res) {
	res.render("foodOverview.nunj", req.session.templateData);
});

router.get('/food/:id', function (req, res) {
	req.session.templateData.foodId = req.params.id;
	res.render("food.nunj", req.session.templateData);
});

router.get('/login', function (req, res) {
	res.render("login.nunj", req.session.templateData);
});

router.post('/login', function (req, res) {
	if (req.is_admin) {
		req.session.templateData.messages.push({ type: 'info', message: 'You were already logged in'});
		req.session.DNRTD;
		res.redirect('/public');
	} else if (req.body.username && req.body.password) {
		auth.user.isAdmin(req.body.username, req.body.password, function (is_admin, error) {
			console.log("Is Admin: " + is_admin);
			if (is_admin) {
				req.session.user = "Basic " + new Buffer(req.body.username + ":" + req.body.password).toString("base64");
				req.session.templateData.messages.push({type: 'success', message: 'Successfully logged in!'});
				req.session.DNRTD = true;
				res.redirect('/public');
			} else {
				req.session.templateData.messages.push({type: 'danger', message: 'Username or password incorrect'});
				res.render("login.nunj", req.session.templateData);
			}
		});
	} else {
		req.session.templateData.messages.push({type: 'danger', message: 'Username or password incorrect'});
		res.render("login.nunj", req.session.templateData);
	}
});

router.get('/logout', function (req, res) {
	req.session.templateData.messages.push({type: 'success', message: 'Successfully logged out!'});
	req.session.user = null;
	req.session.DNRTD = true;
	res.redirect('/public')
});

module.exports = router;