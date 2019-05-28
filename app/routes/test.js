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
console.log(err, response, body);
                                  }

)

});
}