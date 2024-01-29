const mysql = require('mysql2');

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

async function testing() {
    const query = await connection.query("SELECT * FROM users");
    console.log(query);
}

testing();