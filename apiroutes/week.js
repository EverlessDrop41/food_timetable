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

router.get('/:id', function (req, res) {
	models.Week.findById(req.params.id, {
  	include: [
	  	incl.Monday.mod,
	  	incl.Tuesday.mod,
	  	incl.Wednesday.mod,
	  	incl.Thursday.mod,
	  	incl.Friday.mod
	  ]
	}).then(function (week) {
		res.send(week);
	}).catch(function (e) {
		console.error(e);
		res.sendStatus(500);
	});
});

router.post('/', function (req, res) {
	if (!req.body.name) {
		res.send("Name is required");
		return;
	}

	models.Week.create({
		name: req.body.name,
		MondayId: req.body.MondayId,
		TuesdayId: req.body.TuesdayId,
		WednesdayId: req.body.WednesdayId,
		ThursdayId: req.body.ThursdayId,
		FridayId: req.body.FridayId
	}).then(function (week) {
		res.send(week);
	}).catch(function (err) {
		console.error(err);
	});
});

router.put("/:id", function (req, res) {
	models.Week.findById(req.params.id).then(function (Week) {
    if (Week) {

    	mon = req.body.MondayId == undefined ? Week.MondayId : req.body.MondayId;
    	tue = req.body.TuesdayId == undefined ? Week.TuesdayId : req.body.TuesdayId;
    	wed = req.body.WednesdayId == undefined ? Week.WednesdayId : req.body.WednesdayId;
    	thu = req.body.ThursdayId == undefined ? Week.ThursdayId : req.body.ThursdayId;
    	fri = req.body.FridayId == undefined ? Week.FridayId : req.body.FridayId;

      Week.updateAttributes({
      	name: req.body.name || Week.name,
      	MondayId: mon,
      	TuesdayId: tue,
      	WednesdayId: wed,
      	ThursdayId: thu,
      	FridayId: fri
      }).then(function (Week) {
      	res.send(Week);
      }).catch(function (err) {
      	console.error(err);
      	res.send(err);
      });
    } else {
      res.status(404).send("Not found");
    }
  });
})

router.delete("/:id", function (req, res) {
	models.Week.findById(req.params.id).then(function (Week) {
    if (Week) {
      Week.destroy().then(function() {
        res.sendStatus(204);
      });
    } else {
      res.status(404).send("Not found");
    }
  });
});

module.exports = router;