const mongoose = require('mongoose');
 
const ClaimSchema = mongoose.Schema({
    
    desc: String,
    degree:String ,
    typeOfClaim:String,
    BusinessName:String,
    Visitor_id:String,
    time:String,
 // image: 
   // { data: Buffer, contentType: String },
   // video: 
   // { data: Buffer, contentType: String }
});
 
module.exports = mongoose.model('Claim', ClaimSchema);