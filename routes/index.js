const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');
const UsersControllers = require("../controllers/UsersControllers");
const GetAuthPageControllers = require("../controllers/GetAuthPageControllers");
const BooksControllers = require("../controllers/BooksControllers");

/* GET home page. */
router.get('/', authMiddleware, BooksControllers.GetHomePage);
router.get('/book/:id', authMiddleware, BooksControllers.GetPageBook)
router.get('/login', authMiddleware, GetAuthPageControllers.getLoginPage);
router.post('/login', authController.login);
router.post('/registration', authController.registration);
router.get('/registration', authMiddleware, GetAuthPageControllers.getRegistrationPage);
router.get('/logout', UsersControllers.Logout);

module.exports = router;