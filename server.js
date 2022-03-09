const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();


// express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to Database
const db = mysql.createConnection (
    {
        host: 'localhost',
        // your mySQL username
        user: 'root',
        // your mySQL password
        password: 'password',
        database: 'election'
    },
    console.log('connected to election database.')
);

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
console.log(`server is running on ${PORT}`);
});

// query method to call data of table
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});




