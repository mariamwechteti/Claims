const multer = require("multer");
var request = require('request'); //assuming you installed this module
var async = require("async");

var request  = require('request-promise');
var storage = multer.diskStorage({
    destination: 'assets/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
    }
})
var upload = multer({ storage: storage });

module.exports = function(app) {
 
    var claims= require('../controllers/claims.controller.js');
    var comptes= require('../controllers/wassim.controller.js');

 
    // Create a new claims
    app.post('/api/claims',upload.single('image'), claims.create);
    // Retrieve all claims
    app.get('/api/claims', claims.findAll);
    // Retrieve a single claims by Id
    app.get('/api/claims/:code', claims.findOne);
      // Update a claims with Id
      app.put('/api/claims/:code', claims.update);
          // Delete a claims with Id
    app.delete('/api/claims/:code', claims.delete);
    app.get('/api/wassim', function(req, res){
      request("http://51.75.87.48:13100/api/Clients", { json: true }, function(err, body){
          res.json(body); //res is the response object, and it passes info back to client side
      });
    });
    app.get('/api/wassim', function(req, res){
      request("http://51.75.87.48:13100/api/Clients", { json: true }, function(err, body){
          res.json(body); //res is the response object, and it passes info back to client side
      });
    });
    app.post('/api/clients', function(req, res){
    
      
      request({method: 'POST',
      url: 'http://51.75.87.48:13100/api/Clients',
      body: {
        "cin":req.body.cin,
        "nom":req.body.nom,
        "prenom":req.body.prenom,
        "password":req.body.password,
        "email":req.body.email,
        "db_client":req.body.db_client,
      },
      
      json: true // Automatically stringifies the body to JSON
      
      
      },  function (err, response, body) {
        res.send(body);
      console.log(err, response, body);
      
  });
});
app.post('/api/comptes', function(req, res){
  var cin=req.body.cin;
  
  request({ method: 'POST',
  url: 'http://51.75.87.48:13100/api/Clients/'+cin+'/compte',
  body: {
    "num_compte":req.body.num_compte,
    "type_depense":req.body.type_depense,
    "dba_count":req.body.dba_count,
    "solde":req.body.solde,
    "client_id":req.body.cin
  },
          
  json: true // Automatically stringifies the body to JSON


},  function (err, response, body) {
  console.log(err, response, body);
  
});
});



app.post('/api/comp', function(req, res){
  var cin=req.body.cin;
  var nc=req.body.num_compte;
  console.log(cin);
  request({method: 'POST',
  url: 'http://51.75.87.48:13100/api/Clients',
  body: {
    "cin":req.body.cin,
    "nom":req.body.nom,
    "prenom":req.body.prenom,
    "password":req.body.password,
    "email":req.body.email,
    "db_client":req.body.db_client,
  },
  
  json: true // Automatically stringifies the body to JSON
  
  
  },  function (err, response, body) {
    console.log('Fin POST1');
    
      console.log('Debut POST2');
      request({ method: 'POST',
url: 'http://51.75.87.48:13100/api/Clients/'+cin+'/compte',
body: {
  "num_compte":nc,
  "client_id":cin
},
        
json: true // Automatically stringifies the body to JSON


},  function (err, response, body) {
console.log(err, response, body);
console.log(cin);
console.log('Fin POST2');

});
    
  console.log(err, response, body);
  

});

});
console.log('Debut POST2');

}
