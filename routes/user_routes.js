const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const user = require('../models/user')



router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.delete('/:id', userController.deleteUser)
router.post('/favoritar/:id_user/:id_receita', userController.favoritarReceita)
router.post('/desfavoritar/:id_user/:id_receita', userController.desfavoritarReceita)


module.exports = router;