const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require("../config");

const generateAccessToken = (id, login, rol) => {
    const payload = {
        id,
        login,
        rol
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authControllers {
    async registration(req, res){
        try{
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "Пользователь с таким логином уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const user = new User({username, password: hashPassword, role: "Пользователь"})
            await user.save()
            return res.json({message: "Пользователь успешно зарегестрирован."})
        } catch (e){
            console.log(e);
            res.status(400).json({message: "Ошибка регистрации."})
        }
    }

    async login(req, res){
        try{
            const {username, password} = req.body;
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: `Пользователь ${username} не найден.`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword){
                return res.status(400).json({message: "Введен неверный пароль."});
            }
            const token = generateAccessToken(user._id, user.username, user.role);
            return res.json({token})
        } catch (e){
            console.log(e);
            res.status(400).json({message: "Ошибка входа в систему."})
        }
    }
}

module.exports = new authControllers();