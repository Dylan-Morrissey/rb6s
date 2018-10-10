let mongoose = require('mongoose');

let RainbowSixSchema = new mongoose.Schema({
        name: String,
        side: String,
        force: String,
        gadget:String,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'rainbowsixdb' });

module.exports = mongoose.model('Operator', RainbowSixSchema);


