const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/login', function (req, res, next){
  res.render('login', {title: 'Login', out: 'Input text'});
});

router.get('/registration', function (req, res, next){
  res.render('registration', {title: 'Registration'});
});

module.exports = router;