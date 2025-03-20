const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body

        const usuario_existe = await User.findOne({ username })

        if (usuario_existe) {
            return res.status(400).json({message: 'Usuario ja existe'})
        }

        const hashed_password = await bcrypt.hash(password, 10)

        const novo_usuario = new User({ username, password: hashed_password})
        await novo_usuario.save()


        res.status(201).json({ message: 'Usuário criado com sucesso' });

    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: 'Usuario não encontrado' })
        }
        
        const password_match = await bcrypt.compare(password, user.password)

        if (!password_match) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user._id}, 'seusegredo', {expiresIn: '1h'})

        res.json({ token });  
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;