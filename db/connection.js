const mysql = require('mysql2');
const db = mysql.createConnection (
    {
        host: 'localhost',
        // your mySQL username
        user: 'root',
        // your mySQL password
        password: 'password',
        database: 'election'
    });

module.exports = db;