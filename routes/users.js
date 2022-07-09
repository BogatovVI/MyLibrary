const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const superuserMiddleware = require('../middleware/superuserMiddleware');
const UsersControllers = require('../controllers/UsersControllers');
const AdminAndSupUserControllers = require('../controllers/AdminAndSupUserControllers');
const User = require('../models/User')

router.get('/:id', authMiddleware, UsersControllers.SelectUser);
router.get('/:id/admin', adminMiddleware, AdminAndSupUserControllers.AdminShow);
router.get('/:id/superuser', superuserMiddleware, AdminAndSupUserControllers.SuperUserShow);
//Обрабатываем изменение роли пользователя
router.put('/superuser', AdminAndSupUserControllers.RenameRole);

module.exports = router;