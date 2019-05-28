const Visitor = require('../models/visitor.model.js');
// POST a Customer
exports.create = (req, res) => {
    // Create a Visitor
    const visitor = new Visitor({
	email: req.body.email,
    tel: req.body.tel,
     userName:req.body.userName, 
    password: req.body.password, 
    firstName: req.body.firstName, 
    lastName:req.body.lastName,
    token:"",
    role:req.body.role,
    });
 
    // Save a Customer in the MongoDB
   visitor.save()
    .then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FETCH all visitors
exports.findAll = (req, res) => {
    Visitor.find()
    .then(visitors => {
        console.log(visitors);
        res.send(visitors);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a visitor 
exports.findOne = (req, res) => {
   Visitor.findById(req.params.code)
    .then(visitor => {
        if(!visitor ) {
            return res.status(404).send({
                message: "Visitor not found with id " + req.params.code
            });            
        }
        res.send(visitor );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Visitor not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Visitor with id " + req.params.code
        });
    });
};
// UPDATE a Visitor
exports.update = (req, res) => {
    // Find customer and update it
    Visitor.findByIdAndUpdate(req.params.code, {
       
        email: req.body.email,
        tel: req.body.tel,
         userName:req.body.userName, 
        password: req.body.password, 
        firstName: req.body.firstName, 
        lastName:req.body.lastName,
    }, {new: true})
    .then(visitor => {
        if(!visitor) {
            return res.status(404).send({
                message: "visitor not found with id " + req.params.code
            });
        }
        console.log(visitor);
        res.send(visitor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "visitor not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Error updating visitor with id " + req.params.code
        });
    });
};
// DELETE a Vistor
exports.delete = (req, res) => {
    Visitor.findByIdAndRemove(req.params.code)
    .then(visitor => {
        if(!visitor) {
            return res.status(404).send({
                message: "visitor not found with id " + req.params.code
            });
        }
        res.send({message: "visitor deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "isitor not found with id " + req.params.code
            });                
        }
        return res.status(500).send({
            message: "Could not delete visitor with id " + req.params.code
        });
    });
};