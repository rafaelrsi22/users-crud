const moment = require('moment');
const { sqlQuery } = require('../db');

function convertSQLDate(date) {
    return moment(date).format('LLL');
}

async function getProfileIDByUserId(userId) {
    const profileResult = await sqlQuery('SELECT p.id FROM users u JOIN users_profiles up ON up.user_id = u.id JOIN profiles p ON up.profile_id = p.id WHERE u.id = ?', [userId]);

    return profileResult[0][0].id;
}

module.exports.createUser = async function(username) {
    const userInsertion = await sqlQuery('INSERT INTO users (username) VALUES (?)', [username]);
    const profileInsertion = await sqlQuery('INSERT INTO profiles (bio) VALUES (?)', [`Olá, meu nome é ${username}`]);

    const userId = userInsertion[0].insertId
    const profileId = profileInsertion[0].insertId;

    await sqlQuery('INSERT INTO users_profiles (user_id, profile_id) VALUES (?, ?)', [userId, profileId]);

    return;
}

module.exports.getAllUsers = async function() {
    const queryResult = await sqlQuery('SELECT * FROM users');
    queryResult.pop();

    const formatedQuery = queryResult[0].map((value) => {
        return {
            id: value.id,
            username: value.username,
            created_at: convertSQLDate(value.created_at),
            updated_at: convertSQLDate(value.updated_at)
        }
    });

    return formatedQuery;
}

module.exports.deleteUser = async function(userId) {
    const profileResult = await sqlQuery('SELECT p.id FROM users u JOIN users_profiles up ON up.user_id = u.id JOIN profiles p ON up.profile_id = p.id WHERE u.id = ?', [userId]);

    const profileId = profileResult[0][0].id;

    await sqlQuery('DELETE FROM profiles WHERE id = ?', [profileId]);
    await sqlQuery('DELETE FROM users WHERE id = ?', [userId]);

    return;
}

module.exports.updateUser = function(userId, newName) {
   return sqlQuery('UPDATE users SET username = ? WHERE id = ?', [newName, userId]);
}

module.exports.getUserProfile = async function(userId) {
    const queryResult = await sqlQuery('SELECT p.id, p.bio, u.username FROM users u JOIN users_profiles up ON up.user_id = u.id JOIN profiles p ON up.profile_id = p.id WHERE u.id = ?', [userId]);

    queryResult.pop();
    return queryResult[0][0];
}

module.exports.updateUserProfile = async function(userId, bio) {
    const profileId = await getProfileIDByUserId(userId);
    await sqlQuery('UPDATE profiles SET bio = ? WHERE id = ?', [bio, profileId]);
}