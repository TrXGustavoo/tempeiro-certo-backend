const Receita = require('../models/recipe');

exports.listarReceitas = async (req, res) => {
  try {
    const receitas = await Receita.find();
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.criarReceita = async (req, res) => {
  const receita = new Receita(req.body);
  try {
    const novaReceita = await receita.save();
    res.status(201).json(novaReceita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Adicione outras funções (atualizar, excluir, etc.)
