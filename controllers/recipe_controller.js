const Receita = require('../models/recipe');

async function listarReceitas(req, res) {
  try {
    const receitas = await Receita.find();
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function criarReceita(req, res) {
  const receita = new Receita(req.body);
  try {
    const novaReceita = await receita.save();
    res.status(201).json(novaReceita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getReceitaById(req, res) {
  try {
    const receita = await Receita.findById(req.params.id);
    res.json(receita);
  } catch (err) {
    console.log('erro ao exibir receita', err);
  }
}

async function deleteReceita(req, res) {
  try {
    const id_receita = req.params.id;
    const receita = await Receita.findByIdAndDelete(id_receita);
    res.status(200).json({ message: 'Receita deletada com sucesso' });
  } catch (error) {
    console.log('Erro do deletar receita', error);
  }
}

async function editarReceita(req, res) {
  try {
    const id_receita = req.params.id;

    const receita = await Receita.findByIdAndUpdate(id_receita, req.body, {new: true})
    if (!receita) {
      return res.status(404).send('usuario nao encontrado')
    }
    res.send(receita)
    console.log('Receita editada com sucesso')
  } catch (err) {
    console.log('Erro ao editar receita', err);
  }
}



module.exports = {
  listarReceitas,
  criarReceita,
  getReceitaById,
  deleteReceita,
  editarReceita,
};