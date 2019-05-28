const User = require('../models/visitor.model.js');
const config=require('../config/config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
exports.signup = (req,res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
		user=new User({
			userName: req.body.userName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
			firstName:req.body.firstName,
			lastName:req.body.lastName,
			role:req.body.role
		});
	//	user.setPassword(req.body.password);
		 user.save()
    .then(data => {
		console.log(data);

        res.send(data);
    }).catch(err => {
		console.log(err);
        res.status(500).send({
            message: err.message
        });
    });
	
	
	
}
exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		
			userName: req.body.userName
		
	}).then(user => {
		if (!user) {
		//	return res.status(404).send('User Not Found.');
			console.log("user not found");
		}
		console.log("user  found");

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			console.log("wrong password !");
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ user }, config.jwt_secret, {
		  expiresIn: "60m" // expires in 24 hours
		});
		user.token=token;
		console.log(user.token);
	//	res.send({token});
		return res.status(200).send({ auth: true, token: token ,role:user.role, user:user});
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}
exports.verifyToken = (req, res, next) => {
	let token = req.headers['access-token'];
  
	if (!token){
		console.log('No token provided.' );
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 

		});
	}
 
	jwt.verify(token, config.jwt_secret, (err, decoded) => {
		if (err){
					console.log('Fail to Authentication. Error -> ' + err  );

			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.user._id;
		next();
	});
}
exports.userContent = (req, res) => {
  User.findOne({ _id: req.userId })
  .select('-__v ')
  .exec((err, user) => {
  	  	console.log(req.userId);

    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with _id = " + req.userId
        });                
      }
      return res.status(500).send({
        message: "Error retrieving User with _id = " + req.userId  
      });
    }
          console.log(user);
    res.status(200).send(user);
  });
}