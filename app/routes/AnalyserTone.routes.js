

module.exports = function(app) {
 
    const analyse = require('../controllers/AnalyserToneController.js');
    app.post('/api/analyser', analyse.Analyser);
 
	
	
}
