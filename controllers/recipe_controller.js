const { json } = require('body-parser');
const Receita = require('../models/recipe');

async function listarReceitas(req, res) {
  try {
    const receitas = await Receita.find();
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function criarReceita(req, res, id_usario) {
  
  try {
    const id_usuario = req.params.id_usario
    // req.body.usuario = id_usario
  
    const { nome, ingredientes, modoPreparo, categorias, avaliacoes, comentarios, usuario } = req.body

    console.log("a:", id_usuario)


    // if (!nome || !ingredientes || !modoPreparo || !categorias) {
    //   return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    // }

    const receita = new Receita({
      nome,
      ingredientes,
      modoPreparo,
      categorias,
      usuario: id_usario
    });

    const novaReceita = await receita.save();

    res.status(201).json(novaReceita);
  } catch (err) {
    console.log("erro:",err)
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

    const receita = await Receita.findByIdAndUpdate(id_receita, req.body, { new: true })
    if (!receita) {
      return res.status(404).send('usuario nao encontrado')
    }
    res.send(receita)
    console.log('Receita editada com sucesso')
  } catch (err) {
    console.log('Erro ao editar receita', err);
  }
}


async function adicionarComentario(req, res, id_usuario) {

  try {
    const id_usario = req.params.id_usario
    const id_receita = req.params.id_receita
    const comentario = req.body

    const receita_atualizada = await Receita.findByIdAndUpdate(id_receita, {
      $addToSet: {
        comentarios: comentario
      }
    }, { new: true })

    return res.status(200).json({message: 'Comentario adicionacom com sucesso'})
  } catch (error) {
    return res.status(404).json({message: 'Erro ao adicionar comentario'})

  }
}


module.exports = {
  listarReceitas,
  criarReceita,
  getReceitaById,
  deleteReceita,
  editarReceita,
  adicionarComentario,
};