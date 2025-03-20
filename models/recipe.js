const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  nome: String,
  ingredientes: [String],
  modoPreparo: String,
  categorias: [String],
  avaliacoes: [{ usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, nota: Number }],
  comentarios: [{ usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, texto: String }],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Recipe', recipeSchema, 'receitas');