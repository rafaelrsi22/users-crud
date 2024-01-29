const { sqlQuery } = require('../db');

function createUser(username) {
    return sqlQuery('INSERT INTO users (username) VALUES (?)', [username]);
}

async function getAllUsers() {
    const queryResult = await sqlQuery('SELECT * FROM users');
    queryResult.pop();

    return queryResult[0];
}

async function deleteUser(userId) {
    console.log(userId)
    return sqlQuery('DELETE FROM users WHERE id = ?', [userId]);
}

module.exports = {createUser, getAllUsers, deleteUser};