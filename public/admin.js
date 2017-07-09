var express = require('express');
var router = express.Router();
var auth = require("../auth");

router.get("/", auth.middleware.require_admin, function (req, res) {
	res.render("dashboard.nunj", req.session.templateData);
});

module.exports = router;