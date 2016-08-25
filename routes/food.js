var express = require('express');
var router = express.Router();

models = require("../models");

router.get('/', function (req, res) {
  models.Food.findAll()
    .then(function(food) {
    res.send(food);
  }).catch(function (err) {
    console.error(err);
    res.send("Internal Server Error")
  });
});

module.exports = router;
