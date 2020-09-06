'use strict';

const app = require('express').Router();

app.get('/', (req, res) => {
    req.flash('info', 'Welcome');
    res.send('Welcome to sample-project.');
});

module.exports = app;
