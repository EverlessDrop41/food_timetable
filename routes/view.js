var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
  res.render("overview.nunj");
});

router.get("/food", function (req, res) {
  res.render("food.nunj");
});

module.exports = router;
