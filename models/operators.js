let mongoose = require('mongoose');

//Schema for the Operators (playable characters in the game)
let RainbowSixSchema = new mongoose.Schema({
        name: String,
        side: String,
        force: String,
        gadget:String,
        likes: {type: Number, default: 0}
    },
    { collection: 'rainbowsixdb' });

module.exports = mongoose.model('Operator', RainbowSixSchema);


