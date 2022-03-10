const mysql = require('mysql2');
const express = require('express');
const res = require('express/lib/response');
const inputCheck = require('./utils/inputCheck');

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
/*
app.use((req, res) => {
    res.status(404).end();
});
*/

app.listen(PORT, () => {
console.log(`server is running on ${PORT}`);
});



// GET all candidates using GET method express.js
app.get('/api/candidates/', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


//get a single candidate using express.js
app.get('/api/candidates/:id', (req, res) => {
    const sql = 'SELECT * FROM candidates WHERE id = ?';
    params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a single candidate using express.js

app.delete('/api/candidates/:id', (req,res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json ({
                message: 'Candidate not found'
            });
        } else {
            res.json ({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        } 
     });
});

// Create candidate with express.js
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
    if (err) {
    res.status(400).json({ error: err.message });
    return;
    }
    res.json({
    message: 'success',
    data: body
        });
    });
});




// Create a candidate
/* 
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
                VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});
*/
