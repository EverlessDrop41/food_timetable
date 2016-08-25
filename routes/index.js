var express = require('express');
var router = express.Router();

models = require("../models");

router.use('/food', require('./food'));

router.use('/course', require('./course'));

module.exports = router;
