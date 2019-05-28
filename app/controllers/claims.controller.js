const Claim = require('../models/claims.model.js');
const mongoose=require('mongoose');
var fs = require('fs');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
let date = require('date-and-time');
date.locale('fr');  // French
date.format(new Date(), 'dddd D MMMM');
// POST a Claim
exports.create = (req, res) => {
    // Create a Claim
    const claim = new Claim({
        _id:new mongoose.Types.ObjectId(),
        desc: req.body.desc,
		degree: req.body.degree,
        BusinessName: req.body.BusinessName,
        typeOfClaim:req.body.typeOfClaim,
        Visitor_id:req.body.Visitor_id,
        time:date,
      //  image:{data = fs.readFileSync(req.files.image.path),
       // contentType = 'image/png'}
      //  video:req.file.video
        
    });
 console.log(req.file);
    // Save a Claim in the MongoDB
    claim .save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FETCH all claims
exports.findAll = (req, res) => {
    Claim .find()
    .then(claims => {
        res.send(claims);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};// FIND a claim
exports.findOne = (req, res) => {
   Claim.findById(req.params.code)
    .then(claim => {
        if(!claim ) {
            return res.status(404).send({
                message: "claim not found with id " + req.params.code
            });            
        }
        res.send(claim );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "claim not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error retrieving claim with id " + req.params.code
        });
    });
};


// UPDATE a claim
exports.update = (req, res) => {
    // Find claim and update it
    Claim .findByIdAndUpdate(req.params.code, {
        desc: req.body.desc,
		degree: req.body.degree,
        BusinessName: req.body.BusinessName,
        typeOfClaim:req.body.typeOfClaim
    }, {new: true})
    .then(claim => {
        if(!claim) {
            return res.status(404).send({
                message: "claim not found with id " + req.params.code
            });
        }
        res.send(claim);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "claim not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error updating claim with id " + req.params.code
        });
    });
};
// DELETE a claim
exports.delete = (req, res) => {
    Claim .findByIdAndRemove(req.params.code)
    .then(claim => {
        if(!claim) {
            return res.status(404).send({
                message: "claim not found with id " + req.params.code
            });
        }
        res.send({message: "claim deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "claim not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Could not delete claim with id " + req.params.code
        });
    });
};