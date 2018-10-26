let mongoose = require('mongoose');

//Schema for users of the web app
let RainbowSixUserSchema = new mongoose.Schema({
        name: String,
        email: {type: String, required: true},
        password: {type: String, required: true},
      },
    { collection: 'rainbowsixuserdb' });

module.exports = mongoose.model('User', RainbowSixUserSchema);
