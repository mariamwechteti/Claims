const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    email:{
        type: String,
        lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true  ,
        unique: true,
    },

     userName: {
        type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true
    },
    password: String,
    
    
    firstName:{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    lastName:{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    token:String,
    role:String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }]
}
, {timestamps: true}
);
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
const PostSchema = mongoose.Schema({
    
    desc: String,
    degree:String ,
    typeOfClaim:String,
    BusinessName:String,
    Visitor_id:String,
    Imgdata:Buffer,
    ImgType:String,
  

});

const Post = mongoose.model('Post', PostSchema, 'posts');
  const User = mongoose.model('User', UserSchema, 'users');
module.exports = {
    Post, User,
  }