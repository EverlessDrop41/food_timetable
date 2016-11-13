var bcrypt = require('bcryptjs');
var config = require('../config/config').app;
var models = require("../models");

module.exports = {
  hash: function  (password, callback) {
    bcrypt.hash(password, config.salt_rounds, callback);
  },
  isMatch: function (password, hash, callback) {
    bcrypt.compare(password, hash, callback);
  },
  isValid: function (password) {
    //TODO: Improve password validation
    return true;
  }
};