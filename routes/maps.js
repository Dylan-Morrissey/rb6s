let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Map = require('../models/maps');
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

    Map.find(function (err, maps) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(maps,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Map.find({"_id": req.params.id},function(err,map){
        if (err)
            res.send({ message: 'Map Not Found'});
        else
            res.json(map);
    });
}

router.addMap = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var map = new Map();

    map.name = req.body.name;
    map.location = req.body.location;
    map.terrain = req.body.terrain;
    map.maxplayers = req.body.maxplayers;
    map.modes = req.body.modes;
    map.floors = req.body.floors;
    map.ranked = req.body.ranked;

    map.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Map Added!'});
    });
}

router.updateMap = (req, res) => {

    Map.findByIdAndUpdate(req.params.id, req.body, {new : true} , function (err, map) {
        if (err)
            res.json({message: 'Map Not Found'});
        else {
            res.json({message: 'Map Updated'});
        }
    });
}


router.incrementLikes = (req, res) => {

    Map.findById(req.params.id, function(err,map) {
        if (err)
            res.json({ message: 'Map NOT Found!', errmsg : err });
        else {
            map.likes += 1;
            map.save(function (err) {
                if (err)
                    res.json(err);
                else
                    res.json('Likes incremented');
            });
        }
    });
}

function getTotalLikes(array) {
    let totalLikes = 0;
    array.forEach(function(obj) { totalLikes += obj.likes; });
    return totalLikes
}

router.findTotalLikes = (req, res) => {

    Map.find(function(err, maps) {
        if (err)
            res.send(err);
        else
            res.json({ totallikes : getTotalLikes(maps) });
    });
}

router.deleteMap =(req,res)=> {

    Map.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.send('Map Deleted');
    });
}

module.exports = router;