var express = require('express');
var router = express.Router();
var auth = require('../auth');
//Messages should be in the format { type: TYPE, message: MESSAGE }
//Types can be success, info, warning, danger
router.all('*', auth.middleware.is_admin, function (req, res, next) {

	if (req.session.DNRTD) {
		req.session.templateData.is_admin = req.is_admin;
		req.session.DNRTD = false;
	} else {
		req.session.templateData = {is_admin: req.is_admin, messages: []};
	}	
	next();
});

router.use('/', require("./public"));
router.use('/admin', require("./admin"));

module.exports = router;