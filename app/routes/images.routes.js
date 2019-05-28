var express = require('express'); 
var app = express(); 
var Image= require('../controllers/image.controller.js');
const image = require('../models/images.model.js');

var multer = require('multer');
const path   = require('path');

/*cloudinary.config({
  cloud_name: 'djqnlzwhg',
  api_key: '865828279248375',
  api_secret: 'SzYUDBW15xgDqm6Ex_jLJ5Iop3'
  });
  const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const parser = multer({ storage: storage });*/
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'fileprint/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + path.extname(file.originalname));
    }
  })

  var upload = multer({ //multer settings
    storage: storage
});
module.exports = function(app) {
 
  

   
  app.post('/api/upload' ,upload.single('file'),Image.uploadimg);
	  // Retrieve all images
   app.get('/api/photos', function(err, res) {
        console.log("Get image function");
        image.findOne({},'img createdAt',function (err,img) {
            if (err) return res.send(err);
            console.log(img);
     // var base64 = (doc[0].data.toString('base64'));
         res.send(img);        
        });
    });
    app.delete('api/del',Image.delete);

}
