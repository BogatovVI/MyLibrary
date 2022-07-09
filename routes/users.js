const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const UsersControllers = require('../controllers/UsersControllers')

/* GET users listing. */
router.get('/:id', authMiddleware, UsersControllers.SelectUser);
//Дописать новый middleware для проверки роли пользователя!
router.get('/:id/admin', authMiddleware, function (req, res){
    let User_info_id = false;
    if (!req.user){
        User_info_id = false;
    }
    else{
        User_info_id = req.user.id;
    }
    res.render('admin',{ title: 'Админ-панель', Auth: req.isAuth, User: User_info_id});
});

module.exports = router;