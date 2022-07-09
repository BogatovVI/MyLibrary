class GetAuthControllers{
    getLoginPage (req, res){
        let User_info_id = false;
        if (!req.user){
            User_info_id = false;
        }
        else{
            User_info_id = req.user.id;
        }
        res.render('login', {title: 'Войти', Auth: req.isAuth, User: User_info_id});
    }

    getRegistrationPage (req, res){
        let User_info_id = false;
        if (!req.user){
            User_info_id = false;
        }
        else{
            User_info_id = req.user.id;
        }
        res.render('registration', {title: 'Регистрация', Auth: req.isAuth, User: User_info_id});
    }
}

module.exports = new GetAuthControllers();