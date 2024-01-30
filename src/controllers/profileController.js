const User = require('../models/User');

module.exports.getProfile = async function(req, res) {
    try {
        const userProfile = await User.getUserProfile(req.params.userId);
        return res.status(200).send({username: userProfile.username, bio: userProfile.bio});
    } catch(e) {
        return res.status(500).send(e);
    }
}

module.exports.updateProfile = async function(req, res) {
    try {
        await User.updateUserProfile(req.params.userId, req.body.bio);
        return res.status(200).end();
    } catch(e) {
        return res.status(500).send(e);
    }
}