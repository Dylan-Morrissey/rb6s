let operators = require('../models/operators');
let express = require('express');
let router = express.Router();

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(operators,null,5));
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var operator = getByValue(operators, req.params.name);

    if (operator != null)
        res.send(JSON.stringify(operator, null, 5));
    else
        res.send('Operator Not Found');
}

router.addOperator = (req, res) => {
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id

    var currentSize = operators.length;

    operators.push({id: id, name: req.body.name, side: req.body.side, force: req.body.force, gadget: req.body.gadget, upvotes: 0});

    if((currentSize + 1) == operators.length)
        res.json({message: 'Operator Added!'});
    else
        res.json({ message: 'Operator NOT Added!'});
}

router.incrementUpvotes = (req, res) => {
    // Find the relevant donation based on params id passed in
    // Add 1 to upvotes property of the selected donation based on its id
    var operator = getByValue(operators,req.params.name);

    if (operator!=null) {
        operator.upvotes += 1;
        res.json({status: 200, message: 'Up Vote Successful', operator: operator});
    } else
        res.send('Operator Not found -up vote not successful');
}

router.deleteOperator =(req,res)=> {

    var operator = getByValue(operators, req.params.name);
    var index = operators.indexOf(operator);

    var currentSize = operators.length;
    operators.splice(index, 1);

    if (operator != null) {
        if ((currentSize - 1) == operators.length)
            res.json({message: 'Operator Deleted'});
        else
            res.json({message: 'Operator not deleted'});
            res.send(JSON.stringify(operator, null, 5));
    }
    else
        res.send('Operator Not Found');
}

function getByValue(array, name) {
    var result  = array.filter(function(obj){return obj.name == name;} );
    return result ? result[0] : null; // or undefined
}

module.exports = router;