const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, unique: true, require: true},
    role: {type: String, require: true}
})

module.exports = model('User', User)