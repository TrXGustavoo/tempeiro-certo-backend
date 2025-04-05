const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    genero: String,
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});

module.exports = mongoose.model('User', userSchema, "users");