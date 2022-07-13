const User = require("../models/User");
const {json} = require("express");
const Book = require("../models/Book");
const fs = require('fs');

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

    async SuperUserShow(req, res){//здесь дописать выборку из базы данных пользователей для вывода в шаблон
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

    async DeleteUser(req, res){
        try{
            const {Login} = req.body;
            const candidate = await User.findOne({username: Login})
            if (candidate){
                await User.deleteOne({username: Login})
                return res.json({message: "Пользователь успешно удален."})
            }
            else{
                return res.json({message: "Пользователь не найден."})
            }
        } catch (e) {
            res.status(400).json({message: "Ошибка удаления пользователя."})
        }
    }

    async GetUser(req, res){
        try{
            const candidates = await User.find()
            res.json(candidates)
        } catch (e) {
            res.status(400).json({message: "Ошибка вывода пользователей."})
        }
    }

    async appendBook(req, res){
        try{
            await req.files.image.mv('files_books/imagesBook/' + req.files.image.name);
            await req.files.file_book.mv('files_books/pdfBook/' + req.files.file_book.name);
            let author = req.body.author;
            let title = req.body.name_book;
            let content = req.body.content;
            let path_img = '/imagesBook/' + req.files.image.name;
            let path_book = '/pdfBook/' + req.files.file_book.name;
            const book = new Book({Author: author, Title: title, Content: content, Path_img: path_img, Path_book_file: path_book});
            await book.save();
            return res.json({message: "Книга успешно создана."})
        } catch (e) {
            res.status(400).json({message: "Ошибка создания книги."})
        }
    }

    async getBooks(req, res){
        try{
            const books = await Book.find().sort({Author: 1})
            res.json(books)
        } catch (e) {
            res.status(400).json({message: "Ошибка вывода книг."})
        }
    }

    async deleteBook(req, res){
        try{
            const {id} = req.body;
            const book = await Book.findOne({_id: id})
            await fs.unlink('files_books' + book.Path_img, err => {
                if(err) throw err;
                console.log('Картинка успешно удалена');
            });
            await fs.unlink('files_books' + book.Path_book_file, err => {
                if(err) throw err;
                console.log('Pdf файл успешно удален');
            });
            await Book.deleteOne({_id: id})
            return res.json({message: `Книга ${book.Author}: ${book.Title} успешно удалена.`})
        } catch (e) {
            res.status(400).json({message: "Ошибка удаления книги."})
        }
    }
}

module.exports = new AdminAndSupUserControllers();