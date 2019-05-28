const config=require('../config/config.js');

var jwt = require('express-jwt');
var auth = jwt({
  secret: config.jwt_secret,
  userProperty: 'payload'
});
module.exports = function(app) {
 
    const controller1 = require('../controllers/profile.js');

	app.get('/api/profile',auth, controller1.profileRead);
	
	
	
	
	
}
