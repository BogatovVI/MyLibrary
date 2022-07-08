const jwt = require('jsonwebtoken')
const {secret} = require("../config")

module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next();
    }
    
    try{
        const {token} = req.cookies
        if (!token){
            req.isAuth = false;
            next()
        }
        const decodedData = jwt.verify(token, secret)
        req.isAuth = true;
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        req.isAuth = false;
        next()
    }
}