const moment = require('moment');
const { sqlQuery } = require('../db');

function convertSQLDate(date) {
    return moment(date).format('LLL');
}

function createUser(username) {
    return sqlQuery('INSERT INTO users (username) VALUES (?)', [username]);
}

async function getAllUsers() {
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

async function deleteUser(userId) {
    console.log(userId)
    return sqlQuery('DELETE FROM users WHERE id = ?', [userId]);
}

module.exports = {createUser, getAllUsers, deleteUser};