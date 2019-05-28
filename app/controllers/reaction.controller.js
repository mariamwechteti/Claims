const Reaction = require('../models/reaction.model.js');

// POST a Reaction
exports.create = (req, res) => {
    // Create a Reaction
    const reaction = new Reaction({
        type: req.body.type,
        Visitor_id:req.body.Visitor_id,
        Claim_id:req.body.Claim_id
		
    });
 
    // Save a Reaction in the MongoDB
    reaction .save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FETCH all reaction
exports.findAll = (req, res) => {
    Reaction.find()
    .then(reactions => {
        res.send(reactions);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a reaction
exports.findOne = (req, res) => {
    Reaction.findById(req.params.code)
    .then(reactions => {
        res.send(reactions);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a reaction by Visitor_id
exports.findwhere = (req,res) => {
   Reaction.find({ "Visitor_id": req.params.code} )
    .then(reactions => {
        res.send(reactions);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a reaction by a Claim_id
exports.findOne = (req, res) => {
    Reaction.findById(req.params.code)
    .then(reaction => {
        if(!reaction ) {
            return res.status(404).send({
                message: "reaction not found with id " + req.params.code
            });            
        }
        res.send(reaction );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reaction not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error retrieving reaction with id " + req.params.code
        });
    });
};

// UPDATE a reaction
exports.update = (req, res) => {
    // Find reaction and update it
    Reaction.findByIdAndUpdate(req.params.code, {
        type: req.body.type
    }, {new: true})
    .then(reaction => {
        if(!reaction) {
            return res.status(404).send({
                message: "reaction not found with id " + req.params.code
            });
        }
        res.send(reaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "reaction not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error updating reaction with id " + req.params.code
        });
    });
};
// DELETE a reaction
exports.delete = (req, res) => {
    Reaction.findByIdAndRemove(req.params.code)
    .then(reaction => {
        if(!reaction) {
            return res.status(404).send({
                message: "reaction not found with id " + req.params.code
            });
        }
        res.send({message: "reaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "reaction not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Could not delete reaction with id " + req.params.code
        });
    });
};