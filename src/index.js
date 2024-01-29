const express = require('express');
const db = require('./db');
const dotenv = require('dotenv').config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log('Server listening on port ' + process.env.PORT);
});