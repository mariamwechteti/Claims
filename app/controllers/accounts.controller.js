const Account = require('../models/accounts.model.js');
// POST a Account
exports.create = (req, res) => {
    // Create a Account
    const account = new Account({
        login: req.body.login,
		password: req.body.password,
        isAdmin: req.body.isAdmin,
        isClient:req.body.isClient,
        Visitor_id:req.body.Visitor_id
    });
 
    // Save a Customer in the MongoDB
    account.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FETCH all Account
exports.findAll = (req, res) => {
    Account.find()
    .then(accounts => {
        res.send(accounts);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FIND a account 
/*exports.findOne = (req, res) => {
    Account.findById(req.params._id)
    .then(account => {
        if(!account ) {
            return res.status(404).send({
                message: "account not found with id " + req.params._id
            });            
        }
        res.send(account );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "account not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving account with id " + req.params._id
        });
    });
};*/
// FIND a account  by Visitor_id
exports.findOne = (req, res) => {
    Account.findById(req.params.Visitor_id)
    .then(account => {
        if(!account ) {
            return res.status(404).send({
                message: "account not found with id " + req.params.Visitor_id
                
            });            
        }
        res.send(account );
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "account not found with id " + req.params.Visitor_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving account with id " + req.params.Visitor_id
        });
    });
};

// UPDATE a account
exports.update = (req, res) => {
    // Find customer and update it
    Account.findByIdAndUpdate(req.params._id, {
        login: req.body.login,
		password: req.body.password,
        isAdmin: req.body.isAdmin,
        isClient:req.body.isClient,
        Visitor_id:req.body.Visitor_id
    }, {new: true})
    .then(account=> {
        if(!account) {
            return res.status(404).send({
                message: "account not found with id " + req.params._id
            });
        }
        res.send(account);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "account not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating account with id " + req.params._id
        });
    });
};
// DELETE a account
exports.delete = (req, res) => {
    Account.findByIdAndRemove(req.params._id)
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "account not found with id " + req.params._id
            });
        }
        res.send({message: "account deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "account not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Could not delete accountwith id " + req.params._id
        });
    });
};