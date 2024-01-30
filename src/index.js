const express = require('express');
const path = require('path');

require('dotenv').config();
require('./db');

const usersRoute = require('./routes/users');

const User = require('./models/User');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use('/users', usersRoute);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public'))

app.get('/', async (req, res) => {
    const users = await User.getAllUsers();
    res.render('index', { users });
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});