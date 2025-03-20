const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  nome: String,
  ingredientes: [String],
  modoPreparo: String,
  categorias: [String],
  avaliacoes: [{ usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, nota: Number }],
  comentarios: [{ usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, texto: String }],
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
});

module.exports = mongoose.model('Recipe', recipeSchema, 'receitas');