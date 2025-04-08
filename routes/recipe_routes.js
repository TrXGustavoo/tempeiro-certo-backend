const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/recipe_controller');
const recipe = require('../models/recipe')
const authenticateToken = require('../middlewares/auth_middlewares')

router.get('/', receitasController.listarReceitas);
router.post('/', authenticateToken, receitasController.criarReceita);
router.put('/:id', authenticateToken, receitasController.editarReceita);
router.put('/comentar/:id', authenticateToken, receitasController.adicionarComentario);
router.delete('/:id', receitasController.deleteReceita);


module.exports = router;