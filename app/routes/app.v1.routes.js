'use strict';

const UserController = require('../controllers/user.server.controller');
const MovieController = require('../controllers/movie.server.controller');
const CinemaController = require('../controllers/cinema.server.controller');
const ScreeningController = require('../controllers/screening.server.controller');
const middlewares = require('../middlewares/authorization');

const app = require('express').Router();

app.post('/register', UserController.registerUser);
app.post('/login', UserController.authenticate);

app.get('/movies', MovieController.getMovies);

app.post('/cinema', CinemaController.create);
app.get('/cinemas', CinemaController.get);

app.post('/screening', ScreeningController.create);
app.get('/screenings/city/:city', ScreeningController.getByCity);
app.get('/screenings/movie/:title', ScreeningController.getByMovie);


module.exports = app;
