const express = require('express');
const router = express.Router();
const receitasController = require('../controllers/recipe_controller');
const recipe = require('../models/recipe')

router.get('/', receitasController.listarReceitas);
router.post('/', receitasController.criarReceita);


module.exports = router;