'use strict';

const UserController = require('../controllers/user.server.controller');
const MovieController = require('../controllers/movie.server.controller');
const CinemaController = require('../controllers/cinema.server.controller');
const middlewares = require('../middlewares/authorization');

const app = require('express').Router();

app.post('/register', UserController.registerUser);
app.post('/login', UserController.authenticate);

app.get('/movies', MovieController.getMovies);

app.post('/cinema', CinemaController.create);
app.get('/cinemas', CinemaController.get);

app.post('/screening', MovieController.getMovies);


module.exports = app;
