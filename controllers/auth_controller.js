const express = require("express")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require("../models/user")


//Função para registrar o usuario
const register = async (req, res) => {
    try {
        const { username, password, genero } = req.body

        //Verificar se o username ja existe
        const existing_user = await User.findOne({ username })
        if (existing_user) {
            return res.status(409).json({message: 'Nome de usuario ja existe'})
        }

        //Criptografa a senha
        hashed_password = await bcrypt.hash(password, 10)

        //Cria o novo usuario
        const new_user = new User({
            username,
            hashed_password,
            genero
        })
        await new_user.save()

        return res.status(201).json({message: 'Registrado com sucesso'})

    } catch (error) {
        console.log("Erro ao cadastrar usuario", error)
        return res.status(500).json({ message: 'Erro ao se registrar' })
    }
}

//função para fazer o login

const login = async (req, res) => {
    try {
        const {username, password} = req.body

        //Encontrar o usuario pelo username
        const user = await User.findOne({username})
        if (!user) {

            return res.status(401).json({message: 'Usuario nao encontrado'})
        }
        const password_valid = await bcrypt.compare(password, user.password)
        if (!password_valid) {
            return res.status(401).json({message: 'Senha invalida'})
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.SECRET_KEY || '12345678',
            { expiresIn: '1h' }
        )

        return res.status(200).json({token, message: 'Login realizado com sucesso'})
    } catch (error) {
        console.log("Erro ao realizar login")
        return res.status(500).json({message: 'Erro ao realizar login'})
    }
}

module.exports = {
    register,
    login,
};