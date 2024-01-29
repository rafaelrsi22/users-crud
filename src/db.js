const mysql = require('mysql2');

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

function sqlQuery(query, params) {
    if (typeof query != "string") {
        throw "Type must be string!";
    }

    return connection.execute(query, params);
}

module.exports = { sqlQuery };