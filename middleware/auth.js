const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //Read token from header
    const token = req.header('x-auth-token')
        
    //Check if there are token
    if(!token) {
        return res.status(401).json({msg: 'No Token'});
    }

    //Validate token
    try {
        const encrypted = jwt.verify(token, process.env.SECRET);
        
        req.user = encrypted.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no valid'})
    }


}