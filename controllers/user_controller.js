const User = require('../models/user')

async function createUser(req, res) {
    const user = new User(req.body)
    try {
        const newUser = await user.save()
        res.status(201).json(newUser);

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

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



module.exports = {
    createUser,
    getAllUser,
    deleteUser,
    getUserById,
    editUser,
};