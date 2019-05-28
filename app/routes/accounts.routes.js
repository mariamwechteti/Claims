module.exports = function(app) {
 
    var accounts = require('../controllers/accounts.controller.js');
 
    // Create a new accounts
    app.post('/api/accounts', accounts.create);
    // Retrieve all accounts
    app.get('/api/accounts', accounts.findAll);
    // Retrieve a single accounts by Id
    app.get('/api/accounts/:code', accounts.findOne);
      // Update a accounts with Id
      app.put('/api/accounts/:code', accounts.update);
          // Delete a accounts with Id
    app.delete('/api/accounts/:code', accounts.delete);
 
 
}