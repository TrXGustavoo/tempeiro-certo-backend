const User = require('../models/user')
const Receita = require('../models/recipe')


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

        console.log(user_atualizado)

        res.status(200).json(user_atualizado)
    } catch (error) {
        console.log('Erro ao favoritar receita', error)
    }
}


async function desfavoritarReceita(req, res) {
    try {
        const id_receita = req.params.id_receita;
        const id_user = req.params.id_user;

        const receita = await Receita.findById(id_receita);
        if (!receita) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }

        const user_atualizado = await User.findByIdAndUpdate(
            id_user,
            { $pull: { favorites: id_receita } }, // <- REMOVE a receita do array
            { new: true }
        );

        console.log(user_atualizado);

        res.status(200).json(user_atualizado);
    } catch (error) {
        console.error('Erro ao desfavoritar receita', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}



module.exports = {
    getAllUser,
    deleteUser,
    getUserById,
    editUser,
    favoritarReceita,
    desfavoritarReceita
};