module.exports = function(app) {
 
    var reactions = require('../controllers/reaction.controller.js');
 
    // Create a new reaction
    app.post('/api/reactions', reactions.create);
    // Retrieve all reactions
    app.get('/api/reactions', reactions.findAll);
    // Retrieve a single reaction by Id
    //app.get('/api/reactions/:code', reactions.findOne);
    // Retrieve a single reaction by Visitor_id
    app.get('/api/reactions/:code', reactions.findwhere);
      // Update a reaction with Id
      app.put('/api/reactions/:code', reactions.update);
          // Delete a reaction with Id
    app.delete('/api/reactions/:code', reactions.delete);
 
 
}