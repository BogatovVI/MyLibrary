const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')
const UsersControllers = require("../controllers/UsersControllers");
const GetAuthPageControllers = require("../controllers/GetAuthPageControllers")

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  let User_info_id = false;
  if (!req.user){
    User_info_id = false;
  }
  else{
    User_info_id = req.user.id;
  }
  res.render('index', { title: 'Home', Auth: req.isAuth, User: User_info_id});
});

router.get('/login', authMiddleware, GetAuthPageControllers.getLoginPage);
router.post('/login', authController.login);
router.post('/registration', authController.registration);
router.get('/registration', authMiddleware, GetAuthPageControllers.getRegistrationPage);
router.get('/logout', UsersControllers.Logout);

module.exports = router;