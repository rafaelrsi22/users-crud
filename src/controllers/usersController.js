const User = require('../models/User');

module.exports.createUser = async function(req, res) {
    const { username } = req.body;
    
    try {
        await User.createUser(username);
        return res.status(200).end();
    } catch (e) {
        return res.stauts(500).send(e);
    }
}

module.exports.getUsers = async function(req, res) {
    const users = await User.getAllUsers();
    return res.status(200).send(users);
}

module.exports.deleteUser = async function(req, res) {
    try {
        await User.deleteUser(req.body.id);
        return res.status(200).end();
    } catch (e) {
        return res.status(500).send(e);
    }
}

module.exports.updateUser = async function(req, res) {
    try {
        await User.updateUser(req.body.id, req.body.username);
        return res.status(200).end();
    } catch (e) {
        return res.status(500).send(e);
    }
}