var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const User = require('../models/visitor.model.js');

    passport.use(new LocalStrategy('local',
    function(username, password, done) {
      User.findOne({ userName: username }, function (err, user) {
        if (err) { return done(err); }
        // Return if user not found in database
        console.log(user);
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        var passwordIsValid = bcrypt.compareSync(password, user.password);
        // Return if password is wrong
        if (!passwordIsValid ) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  ));