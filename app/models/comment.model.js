const mongoose = require('mongoose');
 
const   CommentsSchema = mongoose.Schema({
    desc:String,
    Claim_id:Object,
    Visitor_id:Object
});
 
module.exports = mongoose.model('Comments', CommentsSchema);