var express = require('express');
var router = express.Router();
var auth = require('../auth');

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

/**
 * @api {get} /api/week/ Get Weeks
 * @apiName Get Weeks
 * @apiDescription Get all of the weeks
 * @apiGroup Weeks
 */
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

/**
 * @api {get} /api/week/:id Get Week
 * @apiName Get A week by id
 * @apiDescription Get a week by its' id
 * @apiGroup Weeks
 *
 * @apiParam Number id The week's unique ID
 */
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

/**
 * @api {post} /api/week/ Create a Week
 * @apiName CreateWeek
 * @apiDescription Create a new week
 * @apiGroup Weeks
 *
 * @apiParam {String} Authorization BasicAuth credentials
 * @apiParam {String} name The name of the week
 * @apiParam {Number} MondayId The course ID for Monday
 * @apiParam {Number} TuesdayId The course ID for Tuesday
 * @apiParam {Number} WednesdayId The course ID for Wednesday
 * @apiParam {Number} ThursdayId The course ID for Thursday
 * @apiParam {Number} FridayId The course ID for Friday
 */
router.post('/', auth.middleware.require_admin, function (req, res) {
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

/**
 * @api {put} /api/week/:id Update a Week
 * @apiName UpdateWeek
 * @apiDescription Update the week, most feild are optional
 * @apiGroup Weeks
 *
 * @apiParam {Number} id The id of the week to update
 * @apiParam {String} Authorization BasicAuth credentials
 * @apiParam {String} name The new name of the week
 * @apiParam {Number} MondayId The new course ID for Monday
 * @apiParam {Number} TuesdayId The new course ID for Tuesday
 * @apiParam {Number} WednesdayId The new course ID for Wednesday
 * @apiParam {Number} ThursdayId The new course ID for Thursday
 * @apiParam {Number} FridayId The new course ID for Friday
 */
router.put("/:id", auth.middleware.require_admin, function (req, res) {
	models.Week.findById(req.params.id).then(function (Week) {
    if (Week) {

			const NONE_STR = "none";

    	mon = req.body.MondayId == NONE_STR ? null : req.body.MondayId;
    	tue = req.body.TuesdayId == NONE_STR ? null : req.body.TuesdayId;
    	wed = req.body.WednesdayId == NONE_STR ? null : req.body.WednesdayId;
    	thu = req.body.ThursdayId == NONE_STR ? null : req.body.ThursdayId;
    	fri = req.body.FridayId == NONE_STR ? null : req.body.FridayId;

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

/**
 * @api {delete} /api/week/:id Delete a Week
 * @apiName DeleteWeek
 * @apiDescription Delete a week
 * @apiGroup Weeks
 *
 * @apiParam {Number} id The id of the week to delete
 */
router.delete("/:id", auth.middleware.require_admin, function (req, res) {
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