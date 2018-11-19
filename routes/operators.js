let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Operator = require('../models/operators');
var mongodbUri ='mongodb://dylanm:dylan2010@ds151108.mlab.com:51108/heroku_mfb0cv6t';


mongoose.connect(mongodbUri, { useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//Returns a list of all operators
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Operator.find(function (err, operators) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(operators,null,5));
    });
}

//returns and operator when searched by ID
router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Operator.find({ "_id" : req.params.id },function(err, operator) {
        if (err)
        res.send(err)
        else
        res.send(JSON.stringify(operator,null,5));
    });
}

router.findName = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Operator.find({"name": req.params.name},function(err,operator){
        if (err)
            res.send(err);
        else
            res.json(operator);
    });
}

//returns all operators of a specific side (attacker or defender)
router.findSide = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Operator.find({"side": req.params.side},function(err,operator){
        if (err)
            res.send({ message: 'Operator Not Found'});
        else
            res.json(operator);
    });
}

//returns the operator assigned to the force
router.findForce = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Operator.find({"force": req.params.force},function(err,operator){
        if (err)
            res.send({ message: 'Operator Not Found'});
        else
            res.json(operator);
    });
}

//adds a new operator to the DB
router.addOperator = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var operator = new Operator();

    operator.name = req.body.name;
    operator.side = req.body.side;
    operator.force = req.body.force;
    operator.gadget = req.body.gadget;

    operator.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Operator Added!'});
    });
}

//increases the like an operator has by 1
router.incrementLikes = (req, res) => {

    Operator.findById(req.params.id, function(err,operator) {
        if (err)
            res.json({ message: 'Operator NOT Found!', errmsg : err });
        else {
            operator.likes += 1;
            operator.save(function (err) {
                if (err)
                    res.json(err);
                else
                    res.json('Likes incremented');
            });
        }
    });
}

//change the name of an operator
router.changeName = (req, res) => {

    Operator.findById(req.params.id, function (err, operator) {
        if (err)
            res.json({message: 'Operator Not Found'});
        else {
            operator.name = req.body.name;
            operator.save(function (err) {
                if(err)
                    res.json(err);
                else
                    res.json('Name Updated');
            });
        }
    });
}

//change the side of an operator
router.changeSide = (req, res) => {

    Operator.findById(req.params.id, function (err, operator) {
        if (err)
            res.json({message: 'Operator Not Found'});
        else {
            operator.side = req.body.side;
            operator.save(function (err) {
                if(err)
                    res.json(err);
                else
                    res.json('Side Updated');
            });
        }
    });
}

//change the force of an operator
router.changeForce = (req, res) => {

    Operator.findById(req.params.id, function (err, operator) {
        if (err)
            res.json({message: 'Operator Not Found'});
        else {
            operator.force = req.body.force;
            operator.save(function (err) {
                if(err)
                    res.json(err);
                else
                    res.json('Forece Updated');
            });
        }
    });
}

//change the operators gadget
router.changeGadget = (req, res) => {

    Operator.findById(req.params.id, function (err, operator) {
        if (err)
            res.json({message: 'Operator Not Found'});
        else {
            operator.gadget = req.body.gadget;
            operator.save(function (err) {
                if(err)
                    res.json(err);
                else
                    res.json('Gadget Updated');
            });
        }
    });
}

function getTotalLikes(array) {
    let totalLikes = 0;
    array.forEach(function(obj) { totalLikes += obj.likes; });
    return totalLikes
}

//Returs the total likes for all the operators
router.findTotalLikes = (req, res) => {

    Operator.find(function(err, operators) {
        if (err)
            res.send(err);
        else
            res.json({ totallikes : getTotalLikes(operators) });
    });
}

//Deletes an operator by IF
router.deleteOperator =(req,res)=> {

    Operator.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.send('Operator Deleted');
    });
}

module.exports = router;
