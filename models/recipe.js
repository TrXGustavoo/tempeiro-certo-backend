const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  recipeName: String,
  ingredients: [String],
  prepTime: String,
  description: String,
  portions: Number,
  level: String,
  recipeImage: String,
  categorias: [String],
  avaliacoes: [{ usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, nota: Number }],
  comentarios: [{ usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, texto: String, dataCriacao: { type: Date, default: Date.now } }],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Recipe', recipeSchema, 'receitas');