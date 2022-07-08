const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  res.render('index', { title: 'Home', Auth: req.isAuth});
});

router.get('/login', authMiddleware, function (req, res, next){
  res.render('login', {title: 'Войти', Auth: req.isAuth});
});

router.post('/login', authController.login);

router.get('/registration', authMiddleware, function (req, res, next){
  res.render('registration', {title: 'Регистрация', Auth: req.isAuth});
});

router.post('/registration', authController.registration);

module.exports = router;