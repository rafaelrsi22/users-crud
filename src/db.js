const mysql = require('mysql2');

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

function sqlQuery(query, params) {
    if (params) {
        for (const value of params) {
            if (typeof value === 'object') {
                throw "Type must be different of and object!";
            }
        }
    }

    return connection.execute(query, params);
}

module.exports = { sqlQuery };