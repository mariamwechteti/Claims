var passport = require('passport');
var mongoose = require('mongoose');
const User = require('../models/visitor.model.js');
var bcrypt = require('bcryptjs');

module.exports.register = function(req, res) {
    var user = new User();
  
    user.userName= req.body.userName;
   // user.email = req.body.email;
  
   user.password= bcrypt.hashSync(req.body.password, 8),
   user.email= req.body.email,
   user.firstName=req.body.firstName,
   user.lastName=req.body.lastName
    user.save().then(data => {
      console.log(data);
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
        //  res.send(data);
      }).catch(err => {
      console.log(err);
          res.status(500).send({
              message: err.message
          });
      });
  
  };