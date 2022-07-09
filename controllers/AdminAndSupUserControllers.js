const User = require("../models/User");

class AdminAndSupUserControllers{
    AdminShow(req, res){
        let User_info_id = false;
        if (!req.user){
            User_info_id = false;
        }
        else{
            User_info_id = req.user.id;
        }

        if (req.notAdmin){
            res.render('error',{message: "Нет доступа.", title: "Нет доступа.", Auth: req.isAuth, User: req.user.id});
        }
        else{
            res.render('admin',{ title: 'Админ-панель', Auth: req.isAuth, User: User_info_id});
        }
    }

    async SuperUserShow(req, res){
        let User_info_id = false;
        if (!req.user){
            User_info_id = false;
        }
        else{
            User_info_id = req.user.id;
        }

        if (!req.SupUser){
            res.render('error',{message: "Нет доступа.", title: "Нет доступа.", Auth: req.isAuth, User: req.user.id});
        }
        else{
            res.render('superuser',{title: 'Панель Супер-пользователя', Auth: req.isAuth, User: User_info_id});
        }
    }

    async RenameRole(req, res){
        try{
            const {Login, Role} = req.body
            console.log(req.body);
            const candidate = await User.findOne({username: Login});
            if(candidate){
                await User.updateOne({username: Login}, {role: Role});
                return res.json({message: "Роль успешно изменена."})
            }
            else{
                return res.json({message: "Пользователь не найден."})
            }
        } catch (e) {
            res.status(400).json({message: "Ошибка изменения роли."})
        }
    }
}

module.exports = new AdminAndSupUserControllers();