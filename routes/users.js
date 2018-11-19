//youtube Link I used for help : https://www.youtube.com/watch?v=_EP2qCmLzSE
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');
var mongodbUri ='mongodb://dylan:dylan123@ds125693.mlab.com:25693/rainbowsixdb';
const jwt = require('jsonwebtoken');
const checkAuth = require('../authentication/check-auth');

mongoose.connect(mongodbUri, { useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//Returns all users
router.get ('/', (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    User.find(function (err, users) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(users,null,5));
    });
});

//Method which you sign up to the web app
router.post('/signup', (req, res) => {
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
});

//from using the account from singup you can log in and get access to more methods
router.post('/login', (req,res,next) => {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length < 1)
                res.json({message: 'Wrong Email'});
            if (req.body.password.toString() === user[0].password.toString()) {
                const token =jwt.sign({email: user[0].email, userId: user[0].id}, "securethisplease", {expiresIn: "1h"});
                return res.status(200).json({message: "Authenticated", token :token});

            } else {
                res.json({message: "Wrong Password entered"})
            }
        });
});

//delete a user from there unique ID
router.delete('/:id/delete', checkAuth, (req,res)=> {

    User.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.send('User Deleted');
    });
}
);

module.exports = router;
