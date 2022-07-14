const Book = require("../models/Book")

class BooksControllers{
    async GetHomePage(req, res){
        const books = await Book.find()

        let User_info_id;
        if (!req.user){
            User_info_id = false;
        }
        else{
            User_info_id = req.user.id;
        }
        res.render('index', { title: 'Главная', Auth: req.isAuth, User: User_info_id, Books: books});
    }

    async GetPageBook(req, res){
        try{
            const id = req.params["id"];
            const book = await Book.findOne({_id: id})

            let User_info_id;
            if (!req.user){
                User_info_id = false;
            }
            else{
                User_info_id = req.user.id;
            }
            console.log(book);
            res.render('book', {title: `${book.Author}: ${book.Title}`, Auth: req.isAuth, User: User_info_id, Book: book});
        } catch (e) {
            let User_info_id = false;
            if (!req.user){
                User_info_id = false;
            }
            else{
                User_info_id = req.user.id;
            }
            res.render('error', {message: "Страница не найдена.", Auth: req.isAuth, User: User_info_id});
        }
    }
}

module.exports = new BooksControllers();