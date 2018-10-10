let operators = require('../models/operators');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Operator = require('../models/operators');
var mongodbUri ='mongodb://dylan:dylan123@ds125693.mlab.com:25693/rainbowsixdb';


mongoose.connect(mongodbUri, { useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Operator.find(function (err, operators) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(operators,null,5));
    });

}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Operator.find({"_id": req.params.id},function(err,operator){
        if (err)
            res.send({ message: 'Operator Not Found'});
        else
            res.json(operator);
    });
}


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

router.incrementUpvotes = (req, res) => {

    Operator.findById(req.params.id, function(err,operator) {
        if (err)
            res.json({ message: 'Operator NOT Found!', errmsg : err });
        else {
            operator.upvotes += 1;
            operator.save(function (err) {
                if (err)
                    res.json(err);
                else
                    res.json('Vote incremented');
            });
        }
    });
}

router.deleteOperator =(req,res)=> {

    Operator.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.send('Operator Deleted');
    });
}

function getByValue(array, name) {
    var result  = array.filter(function(obj){return obj.name == name;} );
    return result ? result[0] : null; // or undefined
}

module.exports = router;