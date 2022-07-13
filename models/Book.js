const {Schema, model} = require('mongoose')

const Book = new Schema({
    Author: {type: String, require: true},
    Title: {type: String, require: true},
    Content: {type: String, require: true},
    Path_img: {type: String, unique: true, require: true},
    Path_book_file: {type: String, unique: true, require: true}
})

module.exports = model('Book', Book)