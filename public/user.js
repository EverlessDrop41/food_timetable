var express = require('express');
var router = express.Router();
var auth = require("../auth");

router.get("/", auth.middleware.require_admin, function (req, res) {
	res.render("UserAdmin/User.nunj", req.session.templateData);
});

router.get("/:id", auth.middleware.require_admin, function (req, res) {
  req.session.templateData.userId = req.params.id;
	res.render("UserAdmin/UserDetail.nunj", req.session.templateData);
});

module.exports = router;