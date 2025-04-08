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

async function criarReceita(req, res) {
  try {
      // O ID do usuário autenticado estará disponível em req.userId
      const userId = req.userId;

      const { nome, ingredientes, modoPreparo, categorias } = req.body;

      if (!nome || !ingredientes || !modoPreparo || !categorias) {
          return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
      }

      const receita = new Receita({
          nome,
          ingredientes,
          modoPreparo,
          categorias,
          usuario: userId // Linkando a receita ao usuário autenticado
      });

      const novaReceita = await receita.save();

      // Opcional: Popular o campo 'usuario' na resposta para ter os detalhes do criador
      await novaReceita.populate('usuario', 'username'); // Exemplo: mostrar apenas o username

      res.status(201).json(novaReceita);
  } catch (err) {
      console.error("erro ao criar receita:", err);
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
      const id_usuario = req.userId; 

      // 1. Buscar a receita pelo ID
      const receita = await Receita.findById(id_receita);

      // 2. Verificar se a receita existe
      if (!receita) {
          return res.status(404).send('Receita não encontrada');
      }

      // 3. Verificar se o usuário logado é o criador da receita
      if (receita.usuario.toString() !== id_usuario) {
          return res.status(403).send('Apenas o criador da receita pode editar esta receita');
      }

      // 4. Se for o criador, tentar atualizar a receita
      const receitaAtualizada = await Receita.findByIdAndUpdate(
          id_receita,
          req.body,
          { new: true, runValidators: true }
      );

      // 5. Verificar se a atualização foi bem-sucedida (embora geralmente bem-sucedida se a receita foi encontrada)
      if (!receitaAtualizada) {
          return res.status(500).send('Erro ao atualizar a receita'); 
      }

      res.send(receitaAtualizada);
      console.log('Receita editada com sucesso');

  } catch (err) {
      console.error('Erro ao editar receita', err);
      res.status(500).send('Erro ao editar a receita'); 
  }
}


async function adicionarComentario(req, res) {
  try {
      const id_usuario = req.userId; // ID do usuário autenticado
      const id_receita = req.params.id_receita;
      const { texto } = req.body; // Assumindo que o comentário tem um campo 'texto'

      // 1. Verificar se a receita existe
      const receita = await Receita.findById(id_receita);
      if (!receita) {
          return res.status(404).json({ message: 'Receita não encontrada' });
      }

      // 2. Criar o objeto do comentário com o ID do usuário
      const novoComentario = {
          usuario: id_usuario,
          texto: texto,
          dataCriacao: new Date() // Opcional: adicionar a data de criação
      };

      // 3. Adicionar o comentário ao array de comentários da receita
      const receitaAtualizada = await Receita.findByIdAndUpdate(
          id_receita,
          {
              $push: { comentarios: novoComentario }
          },
          { new: true }
      ).populate('comentarios.usuario', 'username'); // Opcionaltr: popular o nome do usuário no comentário

      if (!receitaAtualizada) {
          return res.status(500).json({ message: 'Erro ao adicionar o comentário' });
      }

      return res.status(200).json({ message: 'Comentário adicionado com sucesso', receita: receitaAtualizada });

  } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      return res.status(500).json({ message: 'Erro ao adicionar o comentário' });
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