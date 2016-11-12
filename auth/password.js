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
  findUser: function (name, callback) {
    models.User.findOne({
      where: {
        name: name
      }
    }).then(callback);
  },
  register: function (username, password, is_admin, callback) {
    if (this.isValid(password)) {
      this.hash(password, function (err, hash) {
        if (err) {
          callback(false, null, err);
        }
        else {
          models.User.create({
            name: username,
            password: hash,
            is_admin: is_admin
          }).then(function (user) {
            callback(true, user, null);
          }).catch(function (error) {
            callback(false, null, error);
          }); 
        }
      }); 
    } else {
      callback(false, null, { message: "Invalid Password" });
    }
  }
};