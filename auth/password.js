var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config/config').app;

module.exports = {
  hashPass: function  (password, callback) {
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
      key: user.authKey,
      name: user.name
    }, config.secret);
  },
  verifyToken: function (token, callback) {
    jwt.verify(token, config.secret, callback);
  }
};