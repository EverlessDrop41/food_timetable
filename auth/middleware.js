module.exports = {
  redirection_url: "/",
  is_admin: function (req, res, next) {
    //TODO: Write proper security
    if (true) {
      next();
    } else {
      res.redirect(self.redirection_url);
    }
  }
}
