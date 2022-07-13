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
//Отправка данных о книге и создание
router.post('/admin/appendBook', AdminAndSupUserControllers.appendBook)
//Получение книг
router.get('/admin/getBooks', AdminAndSupUserControllers.getBooks)
//Удаление книги
router.delete('/admin/deleteBook', AdminAndSupUserControllers.deleteBook)

module.exports = router;