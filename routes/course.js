var express = require('express');
var router = express.Router();

models = require("../models");

router.get('/', function (req, res) {
  models.Course.findAll({
    include: [{
      model: models.Food
    }]
  }).then(function(courses) {
    res.send(courses);
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error")
  });
});

module.exports = router;
