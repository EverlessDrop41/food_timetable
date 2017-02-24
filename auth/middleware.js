var b_auth = require('basic-auth');
var u_auth = require('./user');

module.exports = {
  is_admin: function (req, res, next) {
    //TODO: Write proper security

    var credentials = b_auth(req);

    u_auth.isAdmin(credentials.name, credentials.pass, function (result, err) {
      req.credentials = credentials;
      req.is_admin = result;
      req.auth_err = err;
      next();
    });
  }
}
