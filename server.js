var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path=require('path');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const https = require('https');
var fs = require('fs')
const request = require('request-promise');
var User=require('./app/models/visitor.model');
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
//var passport = require('passport');
//require ('./app/config/passport.js');
//app.use(passport.initialize());
//require('dotenv').config(); 
//reads in configuration from a .env file
passport.use(new Strategy({
  clientID:'410517363130273',
  clientSecret:'35b166cf3b9f6ac9f9be9ada36104748',
  callbackURL: 'https://localhost:13000/auth/facebook/callback',
  	profileFields:['id','displayName','emails']

},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);

  User.findOne({userName: profile.displayName}).exec()
    //find the user or create a new record
    .then(function(user){
      if(user) return done(null, user);

      var user = new User({
        email: profile.emails[0].value,
        userName: profile.displayName
      });
      user.save();
    }).catch(done);
}));
passport.serializeUser(function(user, done) {
	console.log(user);
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
		done(err, user);
	});
});
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

  app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/login/facebook',
  passport.authenticate('facebook',{
    scope: ['publish_pages', 'manage_pages','email ', 'user_friends']
  }));


 app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/',failureRedirect: '/'}))
  app.get('/facebook-search/', (req, res) => {

    // you need permission for most of these fields
    const userFieldSet = 'page_impressions_unique';
  
    const options = {
      method: 'GET',
      uri: 'https://graph.facebook.com/v3.3/1063958837141134/insights/',
      qs: {
        access_token:'EAAF1XQWaf6EBAOYZBlODWPiOQ89gEsiM2H6SJ7EedTEm6KM4vZBtgAS4y8GVuSqTqRZCn3DiLeOZBwwGhnEzkuCzoIo2dHeqim2kYZAEiFaWcPZAGbnEZBPJZAXZAWDb0W1UcDoKGPxBUsxmYZBVbI7SZAQmE1xbIKOVZAcsezQkAPjEBXDfq5JeX2lRos7zk8lM4PUZD',
        fields: userFieldSet
      }
    };
    request(options)
      .then(fbRes => {
        res.json(fbRes);
      })
  })
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
/*
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})*/

var server = app.listen(13000, function () {
  
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
 
})