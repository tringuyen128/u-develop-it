
const express = require('express');
const res = require('express/lib/response');
const inputCheck = require('./utils/inputCheck');

const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;
const app = express();


// express middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// use apiRoutes
app.use('/api', apiRoutes);


app.use((req, res) => {
    res.status(404).end();
});
// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
app.listen(PORT, () => {
console.log(`server is running on ${PORT}`);
    });
});





