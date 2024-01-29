const express = require('express');
const path = require('path');

require('dotenv').config();

const db = require('./db');
const usersRoute = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    res.send(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});