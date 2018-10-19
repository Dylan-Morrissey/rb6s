let mongoose = require('mongoose');

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
    { collection: 'maps' });

module.exports = mongoose.model('Map', RainbowSixMapSchema);
