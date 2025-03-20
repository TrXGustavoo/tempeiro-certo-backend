const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/recipe_controller');
const recipe = require('../models/recipe')

router.get('/', receitasController.listarReceitas);
router.post('/', receitasController.criarReceita);
router.put('/:id', receitasController.editarReceita);
router.delete('/:id', receitasController.deleteReceita);


module.exports = router;