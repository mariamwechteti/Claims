var multer = require('multer');
const path   = require('path');
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
 
    var posts = require('../controllers/new.controller.js');
 
    // Create a new Visitor
    app.post('/api/posts',upload.single('file') ,posts.create);
    app.post('/api/postUser', posts.creating);

    app.get('/api/posts', posts.findOne);

 
 
}