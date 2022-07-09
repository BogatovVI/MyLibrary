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
        else{
            const decodedData = jwt.verify(token, secret)
            req.isAuth = true;
            req.user = decodedData
            const {rol} = decodedData;
            if (rol === "Пользователь" || rol === "Админ"){
                req.SupUser = false;
                next();
            }
            else{
                req.SupUser = true;
                next();
            }
        }
    } catch (e) {
        console.log(e);
        req.isAuth = false;
        req.user = false;
        req.notSupUser = false;
    }
}