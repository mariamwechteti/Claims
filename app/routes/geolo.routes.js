

module.exports = function(app) {
 
    const controller = require('../controllers/geolo.controller.js');
 
	app.get('/api/getGeo', controller.retrieve);
	
	
	
	
}
