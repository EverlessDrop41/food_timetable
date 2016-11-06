var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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
  },
  genKey: function (user) {
    return jwt.sign({
      id: user.id
    }, config.secret);
  },
  verifyToken: function (token, callback) {
    jwt.verify(token, config.secret, callback);
  },
  login: function (name, password, callback) {
    models.User.findOne({
      where: {
        name: name
      }
    }).then(callback);
  }
};