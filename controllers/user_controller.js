const User = require('../models/user')


async function getAllUser(req, res) {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


async function deleteUser(req, res) {
    try {
        const id_user = req.params.id
        const user = await User.findByIdAndDelete(id_user)
        res.status(200).json(user);
    } catch (error) {
        return res.status(404).send(error.message)
    }
}


async function getUserById(req, res) {
    try {
        const id_user = req.params.id
        const user = await User.findById(id_user)
        res.status(200).json(user);
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

async function editUser(req, res) {
    try {
        const id_user = req.params.id
        const user = await User.findByIdAndUpdate(id_user, req.body, { new: true })
    } catch (error) {
        return res.status(404).send(error.message)
    }

}


async function favoritarReceita(req, res) {
    try {
        const id_receita = req.params.id_receita
        const id_user = req.params.id_user

        const receita = await Receita.findById(id_receita)
        if (!receita) {
            return res.status(404).json({message: 'Receita não encontrada'})
        }

        const user_atualizado = await User.findByIdAndUpdate(id_user, { $addToSet: {favorites: id_receita} }, {new:true})

        res.status(200).json(user_atualizado)
    } catch (error) {
        console.log('Erro ao favoritar receita', error)
    }
}


module.exports = {
    getAllUser,
    deleteUser,
    getUserById,
    editUser,
    favoritarReceita
};