module.exports = function(app) {
 
    var comments = require('../controllers/comment.controller.js');
 
    // Create a new comment
    app.post('/api/comments', comments.create);
    // Retrieve all comments
    app.get('/api/comments', comments.findAll);
    // Retrieve a single comment by Id
    app.get('/api/comments/:code', comments.findOne);
      // Update a comments with Id
      app.put('/api/comments/:code', comments.update);
          // Delete a comments with Id
    app.delete('/api/comments/:code', comments.delete);
 
 
}