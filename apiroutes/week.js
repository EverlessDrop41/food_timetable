var express = require('express');
var router = express.Router();

models = require("../models");

var incl = {
	Monday: {
		norm: { model: models.Course, as: "Monday" },
		mod: { model: models.Course, as: "Monday", include: [{model: models.Food} ] },
	},
	Tuesday: {
		norm: { model: models.Course, as: "Tuesday" },
		mod: { model: models.Course, as: "Tuesday", include: [{model: models.Food} ] },
	},
	Wednesday: {
		norm: { model: models.Course, as: "Wednesday" },
		mod: { model: models.Course, as: "Wednesday", include: [{model: models.Food} ] },
	},
	Thursday: {
		norm: { model: models.Course, as: "Thursday" },
		mod: { model: models.Course, as: "Thursday", include: [{model: models.Food} ] },
	},
	Friday: {
		norm: { model: models.Course, as: "Friday" },
		mod: { model: models.Course, as: "Friday", include: [{model: models.Food} ] },
	}
}

router.get('/', function (req, res) {
  models.Week.findAll({
  	include: [
  		incl.Monday.mod,
  		incl.Tuesday.mod,
  		incl.Wednesday.mod,
  		incl.Thursday.mod,
  		incl.Friday.mod
  	]
  }).then(function(weeks) {
    res.send({ weeks: weeks });
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error");
  });
});

module.exports = router;