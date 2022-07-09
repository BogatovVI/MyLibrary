class UsersControllers{
    SelectUser(req, res){
        const user = req.user.login;
        res.render('Personal_Area', {title: "Личный кабинет", Auth: req.isAuth, User: user});
    }

    Logout(req, res){
        res.clearCookie('token');
        res.redirect('/');
    }
}

module.exports = new UsersControllers();