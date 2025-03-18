const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const user = require('../models/user')


router.post('/', userController.createUser)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.delete('/:id', userController.deleteUser)