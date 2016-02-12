'use strict';

const express = require('express');
const app = express();
const CLIENT_PATH = `${__dirname} + './../../client/src/`;

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.set('views', CLIENT_PATH);
app.engine('html', require('ejs').renderFile);

app.use(express.static(CLIENT_PATH));

app.get('/', (req, res) => {
    res.render('app.html');
});

app.get('/about', (req, res) => {
    res.render('app.html');
});

app.listen(3000, () => {
    console.log('Spreadsheet application listening on port 3000!');
});