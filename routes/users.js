//youtube Link I used for help : https://www.youtube.com/watch?v=_EP2qCmLzSE
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');

router.get ('/', (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    User.find(function (err, users) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(users,null,5));
    });
})

router.post('/signup', (req, res) => {
    User.find({email: req.body.email}).then(
        user => {
            if (user) {
                res.json({message: 'This account already exists'})
            } else {

                const user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;

                user.save(function (err) {
                    if (err)
                        res.send(err);
                    else
                        res.json({message: 'Your account has been created!'});
                });
            }
        })
});

router.post('/login', (req,res,next) => {
    User.find({email: req.body.email})
        .then( user => {
            if (user.length <1)
                res.json({message: 'No users created yet :('});

        })
})

router.delete('/:id/delete', (req,res)=> {

    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.send('User Deleted');
    });
}
);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
