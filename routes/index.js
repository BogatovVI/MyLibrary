const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

router.get('/login', function (req, res, next){
  res.render('login', {title: 'Войти'});
});

router.post('/login', function (req,res,next){
  console.log(res);
  res.redirect("registration");
});

router.get('/registration', function (req, res, next){
  res.render('registration', {title: 'Регистрация'});
});

module.exports = router;