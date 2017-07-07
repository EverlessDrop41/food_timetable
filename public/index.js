var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.render("landing.nunj");
})

router.get('/course/:id', function (req, res) {
	res.render("course.nunj", {courseId:req.params.id});
});

module.exports = router;