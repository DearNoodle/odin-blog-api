const passport = require('../../configs/passportConfig');

function loginAuth() {
  passport.authenticate('local', { session: false });
}

function jwtAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error(info.message || 'Unauthorized'));
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = { loginAuth, jwtAuth };
