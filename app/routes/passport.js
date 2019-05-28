

module.exports = function(app) {
 
    const controller1 = require('../controllers/authenticate.js');
    const controller2 = require('../controllers/login.js');

	app.post('/api/register', controller1.register);
	
	app.post('/api/login', controller2.login);
	
	
	
	
}
