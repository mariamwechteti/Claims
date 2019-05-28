const mongoose = require('mongoose');
 
const ReactionSchema = mongoose.Schema({
    
    type: String,
    Claim_id:Object,
    Visitor_id:Object
});
 
module.exports = mongoose.model('Reaction', ReactionSchema);