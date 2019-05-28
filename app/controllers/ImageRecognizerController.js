var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
const Image = require('../models/image.controller.js');

exports.ImgReco=()=>
{
    var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'JFtIRfpuYhBKgHqGKyxMItUI56wc4AuuVe0QGiBvbRLb'
      });
  
    
      var images_file= fs.createReadStream('./fruitbowl.jpg');
      var owners = ["me"];
      var threshold = 0.6;
      
      var params = {
        images_file: images_file,
        owners: owners,
        threshold: threshold
      };
      
      visualRecognition.classify(params, function(err, response) {
        if (err) { 
          console.log(err);
        } else {
          console.log(JSON.stringify(response, null, 2))
        }
      });
}
;