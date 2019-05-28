const New = require('../models/new.model.js');
const mongoose=require('mongoose');
var fs = require('fs');

 var user;
 var _id;

exports.create = (req, res) => {
    // Create a Claim
    Imgdata=new Buffer(fs.readFileSync(req.file.path).toString("base64"));
    ImgType=req.file.mimetype;
    const new1 = new New.Post({
        _id:new mongoose.Types.ObjectId(),
        desc: req.body.desc,
		degree: req.body.degree,
        BusinessName: req.body.BusinessName,
        typeOfClaim:req.body.typeOfClaim,
        Visitor_id:req.body.Visitor_id,
        Imgdata:Imgdata,
        ImgType:ImgType,

      //  image:{data = fs.readFileSync(req.files.image.path),
       // contentType = 'image/png'}
      //  video:req.file.video
        
    });
 console.log(req.file);
    // Save a Claim in the MongoDB
    new1.save()
    .then(data => {
        this._id=data._id;
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
    var User= New.User;
    
    User.findByIdAndUpdate(req.body.code, {$push: {posts:new1}}, {new: true})
    .then(visitor => {
        if(!visitor) {
            return res.status(404).send({
                message: "user not found with id " + req.body.code
            });
        }
        console.log(visitor);
    
        res.send(visitor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.body.code
            });                
        }
        return res.status(500).send({
            message: "Error updating visitor with id " + req.body.code
        });
    });
  
};
exports.creating = (req, res) => {
    // Create a Visitor
    const user = new New.User({
	email: req.body.email,
    userName:req.body.userName, 
    password: req.body.password, 
    firstName: req.body.firstName, 
    lastName:req.body.lastName,
    token:"",
    role:req.body.role,
    });
 
    // Save a Customer in the MongoDB
   user.save()
    .then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a visitor 
exports.findOne = (req, res) => {
    User=New.User;
    return User.findOne({"userName": req.body.userName })
    .populate('posts').exec((err, posts) => {
      console.log("Populated User " + posts);
    })
 };
 