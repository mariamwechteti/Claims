const Reaction = require('../models/geolocalisation.model.js');
const express = require('express');
const app = express();
const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);
const path = require('path');

// POST a Reaction
exports.create = (req, res) => {
    // Create a Reaction
    const geo = new Geo({
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
exports.retrieve=(req,res)=>{
    const ipInfo = req.ipInfo;
    console.log(ipInfo);
    var message = 'Hey, you are browsing from ';
    res.send(message);
};