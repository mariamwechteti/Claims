const Comment = require('../models/comment.model.js');
// POST a Comment
exports.create = (req, res) => {
    // Create a Comment
    const comment = new Comment({
        desc: req.body.desc,
		Visitor_id: req.body.Visitor_id,
        Claim_id: req.body.Claim_id
        
        
    });
 
    // Save a Comment in the MongoDB
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FETCH all comment
exports.findAll = (req, res) => {
    Comment.find()
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a comment
exports.findOne = (req, res) => {
    Comment.findById(req.params._id)
    .then(comment => {
        if(!comment ) {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params._id
        });
    });
};
// FIND a comment
exports.findOne = (req, res) => {
    Comment.findById(req.params._id)
    .then(comment => {
        if(!comment ) {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params._id
        });
    });
};
// FIND a comment
exports.findOne = (req, res) => {
    Comment.findById(req.params._id)
    .then(comment => {
        if(!comment ) {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params._id
        });
    });
};

// FIND a comment by a Claim_id
exports.findOne = (req, res) => {
    Comment.findById(req.params.Claim_id)
    .then(comment => {
        if(!comment ) {
            return res.status(404).send({
                message: "comment not found with id " + req.params.Claim_id
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params.Claim_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params.Claim_id
        });
    });
};

// UPDATE a comment
exports.update = (req, res) => {
    // Find comment and update it
    Comment.findByIdAndUpdate(req.params._id, {
        type: req.body.type
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating comment with id " + req.params._id
        });
    });
};
// DELETE a comment
exports.delete = (req, res) => {
    Comment.findByIdAndRemove(req.params._id)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });
        }
        res.send({message: "comment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "comment not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete comment with id " + req.params._id
        });
    });
};