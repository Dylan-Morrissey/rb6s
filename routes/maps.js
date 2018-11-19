let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
var Map = require('../models/maps');
var mongodbUri ='mongodb://dylan:dylan123@ds125693.mlab.com:25693/rainbowsixdb';


mongoose.connect(mongodbUri, { useNewUrlParser: true});

let db = mongoose.connection;
//if it cannot connect to the db is print this error
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

//if it connects to the db it lets us know
db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

//find all function which finds all the maps
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Map.find(function (err, maps) {
        if (err)
            res.send(err);
        res.send(JSON.stringify(maps,null,5));
    });
}

//finds a single map specified by the user
router.findOneMap = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Map.find({"_id": req.params.id},function(err,map){
        if (err)
            res.send({ message: 'Map Not Found'});
        else
            res.json(map);
    });
}

//allows logged in users to add a new map to the collection
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

//allows the logged in users to change details about the map
router.updateMap = (req, res) => {

    Map.findByIdAndUpdate(req.params.id, req.body, {new : true} , function (err, map) {
        if (err)
            res.json({message: 'Map Not Found'});
        else {
            res.json({message: 'Map Updated'});
        }
    });
}

//Increases the likes a specified map has by 1
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

//Returns the total likes for all maps
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

//Deletes a specified map from the db
router.deleteMap =(req,res)=> {

    Map.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.send('Map Deleted');
    });
}

module.exports = router;