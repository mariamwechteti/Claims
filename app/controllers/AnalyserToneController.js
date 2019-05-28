var watson = require('watson-developer-cloud');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const Claim = require('../models/claims.model.js');

exports.Analyser=(req,res)=>
{
 

 Claim.find({"_id":"5c641347862fe11f50e01cad"},{"desc":1,"_id":0}).then(desc => {
 var text =desc[0].desc;
 console.log(text);
 //res.send(text);
 var toneParams = {
  tone_input: { 'text':text},
  content_type: 'application/json'
};
var toneAnalyzer = new ToneAnalyzerV3({
    version_date: '2018-03-16',
    iam_apikey: 'MXk1Pm2z0jwW78RJnRUZz_S-l7GRwJTMVLK9-NSBeAGj',
    url: 'https://gateway-lon.watsonplatform.net/tone-analyzer/api'
  });


  toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
   if (error) {
     console.log(error);
   } else { 
     res.send(JSON.stringify(toneAnalysis, null, 2));
   }
 }); }).catch(err => {
  res.status(500).send({
      message: err.message
  });
});
  console.log("Processing func -> Analyser");

    };




