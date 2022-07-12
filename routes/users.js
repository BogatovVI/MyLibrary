const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const superuserMiddleware = require('../middleware/superuserMiddleware');
const UsersControllers = require('../controllers/UsersControllers');
const AdminAndSupUserControllers = require('../controllers/AdminAndSupUserControllers');

router.get('/:id', authMiddleware, UsersControllers.SelectUser);
router.get('/:id/admin', adminMiddleware, AdminAndSupUserControllers.AdminShow);
router.get('/:id/superuser', superuserMiddleware, AdminAndSupUserControllers.SuperUserShow);
//Обрабатываем изменение роли пользователя
router.put('/superuser', AdminAndSupUserControllers.RenameRole);
//Обрабатываем удаления пользователя
router.delete('/superuser/deleteUser', AdminAndSupUserControllers.DeleteUser)
//Обрабатываем отправку пользователей
router.get('/superuser/getUser', AdminAndSupUserControllers.GetUser)

module.exports = router;