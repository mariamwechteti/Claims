module.exports = function(app) {
 
    var visitors = require('../controllers/visitor.controller.js');
 
    // Create a new Visitor
    app.post('/api/visitors', visitors.create);
    // Retrieve all Visitors
    app.get('/api/visitors', visitors.findAll);
    // Retrieve a single Customer by Id
    app.get('/api/visitors/:code', visitors.findOne);
      // Update a visitor with Id
      app.put('/api/visitors/:code', visitors.update);
          // Delete a Customer with Id
    app.delete('/api/visitors/:code', visitors.delete);
 
 
}