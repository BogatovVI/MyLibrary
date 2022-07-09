const User = require('../models/User');

class UsersControllers{
    async SelectUser(req, res){
        const user = req.user.id;
        const candidate = await User.findOne({user});
        const username = candidate.username;
        res.render('Personal_Area', {title: "Личный кабинет", Auth: req.isAuth, User: username});
    }

    Logout(req, res){
        res.clearCookie('token');
        res.redirect('/');
    }
}

module.exports = new UsersControllers();