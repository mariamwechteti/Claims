

module.exports = function(app) {
 
    const controller = require('../controllers/controller.js');
 
	app.post('/api/auth/signup', controller.signup);
	
	app.post('/api/authenticate', controller.signin);
	
	app.get('/api/home',[controller.verifyToken], (req, res) => {
		res.send('Congratulations, you made it to home');
	})
	
	app.get('/api/user', [controller.verifyToken], controller.userContent);

}
