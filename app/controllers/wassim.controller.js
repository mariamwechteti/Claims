const request = require('request')
exports.compte = (req, res) => {
  //  var cin=req.body.cin;
    request.post({
        url: 'http://51.75.87.48:13100/api/Clients',
         //URL to hit
         "headers": { "content-type": "application/json" },
         "json":"true",

        method: 'POST', // specify the request type
         
         "body": JSON.stringify({
          "cin":req.body.cin,
          "nom":req.body.nom,
          "prenom":req.body.prenom,
          "password":req.body.password,
          "email":req.body.email,
          "db_client":req.body.db_client

      })
      
    }, function(err, body){
        if (err) { return console.log(err);}

          //res is the response object, and it passes info back to client side
      });
     
    /*  request.post({
          url: 'http://51.75.87.48:13100/api/Clients/'+cin+'/compte',
          "headers": { "content-type": "application/json" },
          "json":"true",

           //URL to hit
          method: 'POST', // specify the request type
         
           
           "body": JSON.stringify({
            "num_compte": req.body.num_compte,
            "type_depense":req.body.type_depense,
            "dba_count":req.body.dba_count,
            "solde":req.body.solde,

  
  
})
        
      }, function(err, body){
          if (err) { return console.log(err);}
          //  res.json(body); //res is the response object, and it passes info back to client side
        });*/
 };
exports.graphApi=()=>
{

};