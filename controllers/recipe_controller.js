const { json } = require('body-parser');
const Receita = require('../models/recipe');
const User = require('../models/user');

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
      
      const userId = req.userId;

      const { recipeName, ingredients, prepTime, description, portions, level, categorias} = req.body;

      console.log("Dados da receita", req.body);

      // if (!nome || !ingredientes || !modoPreparo || !categorias) {
      //     return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
      // }

      console.log("Dados da receita", req.body);

      const receita = new Receita({
          recipeName,
          ingredients,
          prepTime,
          description,
          portions,
          level,
          categorias,
          usuario: userId 
      });

      const novaReceita = await receita.save();

      
      await novaReceita.populate('usuario', 'username'); 

      console.log('Receita criada com sucesso:', novaReceita);
      res.status(201).json(novaReceita);
  } catch (err) {
      console.error("erro ao criar receita:", err);
      res.status(400).json({ message: err.message });
  }
}

// async function getReceitaById(req, res) {
//   try {
//     const receita = await Receita.findById(req.params.id);
//     res.json(receita);
//   } catch (err) {
//     console.log('erro ao exibir receita', err);
//   }
// }

async function getReceitaById(req, res) {
  try {
    const receita = await Receita.findById(req.params.id)
      .populate('usuario', 'username') // Popula o criador da receita
      .populate('comentarios.usuario', 'username'); // Popula o autor de cada comentário

    if (!receita) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json(receita);
  } catch (err) {
    console.log('Erro ao exibir receita:', err);
    res.status(500).json({ message: 'Erro ao buscar a receita' });
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
      const id_usuario = req.userId; 
      const id_receita = req.params.recipeId;
      const { texto } = req.body; 

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


      console.log('Comentário adicionado com sucesso:', receitaAtualizada);
      return res.status(200).json({ message: 'Comentário adicionado com sucesso', receita: receitaAtualizada });

  } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      return res.status(500).json({ message: 'Erro ao adicionar o comentário' });
  }
}

async function listarReceitasDoUsuario(req, res) {
  try {
    const userId = req.userId; // Pega o ID do usuário autenticado via JWT
    const receitas = await Receita.find({ usuario: userId });
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function listarReceitasFavoritas(req, res) {
  try {
    const userId = req.userId;

    // Buscar o usuário e popular as receitas favoritas
    const user = await User.findById(userId).populate({
      path: 'favorites',
      populate: { path: 'usuario', select: 'username' } // Popula o criador da receita
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log('Receitas favoritas:', user.favorites);
    res.status(200).json(user.favorites);
  } catch (error) {
    console.error('Erro ao buscar receitas favoritas:', error);
    res.status(500).json({ message: 'Erro ao buscar receitas favoritas' });
  }
}

module.exports = {
  listarReceitas,
  criarReceita,
  getReceitaById,
  deleteReceita,
  editarReceita,
  adicionarComentario,
  listarReceitasDoUsuario,
  listarReceitasFavoritas
};