

module.exports = function(app) {
 
    const recognition = require('../controllers/ImageRecognizerController.js');
    app.get('/api/recognition', recognition.ImgReco);
 
	
	
}
