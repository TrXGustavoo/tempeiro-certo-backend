const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/recipe_controller');
const recipe = require('../models/recipe')

router.get('/', receitasController.listarReceitas);
router.post('/', receitasController.criarReceita);
router.put('/', receitasController.editarReceita);
router.delete('/:id', receitasController.deleteReceita);


module.exports = router;