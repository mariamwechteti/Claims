const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');    
var jwt = require('jsonwebtoken');
const config=require('../config/config.js');

const VisitorSchema = mongoose.Schema({
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
}
, {timestamps: true}
);
VisitorSchema.plugin(uniqueValidator, {message: 'is already taken.'});



module.exports = mongoose.model('Visitor', VisitorSchema);