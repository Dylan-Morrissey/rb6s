const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        //makes a const token from the authorization message
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        //decodes the token with the secure key from encryption
        const decoded = jwt.verify(token, 'securethisplease');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.json({message : 'Auth Failed'});
    }

};