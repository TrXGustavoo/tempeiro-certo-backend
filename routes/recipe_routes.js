const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/recipe_controller');
const recipe = require('../models/recipe')
const authenticateToken = require('../middlewares/auth_middlewares')

router.get('/list', receitasController.listarReceitas);
router.post('/create', authenticateToken, receitasController.criarReceita);
router.put('/comentar/:recipeId', authenticateToken, receitasController.adicionarComentario);
router.put('/:id', authenticateToken, receitasController.editarReceita);
router.post('/:id_receita/comentarios', authenticateToken, receitasController.adicionarComentario);
router.delete('/:id', receitasController.deleteReceita);
router.get('/minhas-receitas', authenticateToken, receitasController.listarReceitasDoUsuario);
router.get('/:id', receitasController.getReceitaById);
router.get('/favoritos', receitasController.listarReceitasFavoritas);




module.exports = router;