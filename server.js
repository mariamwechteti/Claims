var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path=require('path');
let multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

    // Configuring the database
    const dbConfig = require('./app/config/mongodb.config.js');
    const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.use(bodyParser.json())
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

 
// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to MongoDB."); 
  
   
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});


// Configuring Passport
var passport = require('passport');
require ('./app/config/passport.js');
app.use(passport.initialize());
require('dotenv').config(); 
//reads in configuration from a .env file

 
require('./app/routes/visitor.routes.js')(app);
require('./app/routes/accounts.routes.js')(app);
require('./app/routes/claims.routes.js')(app);
require('./app/routes/passport.js')(app);
require('./app/routes/profile.routes.js')(app);

require('./app/routes/new.routes.js')(app);
require('./app/routes/comment.routes.js')(app);
require('./app/routes/router.js')(app);
require('./app/routes/AnalyserTone.routes.js')(app);
require('./app/routes/images.routes.js')(app);

/*var upload = multer({ dest: 'upload/' })
app.post("/upload",upload.single("img"),function(req,res){
console.log("Uploaded Successfull with filename : "+req.img.filename);
});*/

 
// Create a Server
var server = app.listen(13000, function () {
  
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
 
})