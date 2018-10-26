let mongoose = require('mongoose');

//Schema for Maps connected to mongodb
let RainbowSixMapSchema = new mongoose.Schema({
        name: String,
        location: String,
        terrain: String,
        maxplayers:{type: Number, default: 10},
        modes:String,
        floors: {type: Number, default: 1},
        ranked: String,
        likes: {type: Number, default: 0}
    },
    //adds to the maps collection on rainbow6db
    { collection: 'maps' });

module.exports = mongoose.model('Map', RainbowSixMapSchema);
