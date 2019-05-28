var mongoose = require('mongoose');
const User = require('../models/visitor.model.js');

module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload.user._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload.user._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};