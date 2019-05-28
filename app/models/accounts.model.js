const mongoose = require('mongoose');
 
const   AccountsSchema = mongoose.Schema({
  
    login: { type: String,
         required: true,
        unique: true
     },
    password: { type: String, required: true },
    email:{
        type: String,
        required: true,
        unique: true,
    },
  //  isAdmin:Number,
   // isClient:Number,
  //  Visitor_id:Object
});
 
module.exports = mongoose.model('Accounts', AccountsSchema);