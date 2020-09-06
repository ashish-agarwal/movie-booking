'use strict';

const userController = require('../controllers/user.server.controller');
const middlewares = require('../middlewares/authorization');

const app = require('express').Router();

app.post('/register', userController.registerUser);

app.post('/login', userController.authenticate);


module.exports = app;
