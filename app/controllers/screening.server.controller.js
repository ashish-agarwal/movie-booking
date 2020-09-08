'use strict';

const Promise = require('bluebird');

const CinemaService = require('./../services/cinema.server.service');
const MovieService = require('./../services/movie.server.service');
const ScreeningService = require('./../services/screening.server.service');

exports.create = function (req, res, next) {
    let screeningObj = req.body;
    return Promise.props({
        cinema: CinemaService.getCinemaById(screeningObj.cinema_id),
        movie: MovieService.getMovieById(screeningObj.movie_id)
    }).then((result) => {
        screeningObj = { ...screeningObj, ...result };
        return ScreeningService.createScreening(screeningObj);
    }).then((screening) => {
        return res.status(201).send({
            result: screening,
            message: 'Screening created successfully'
        });
    }).catch((err) => {
        err.status = err.status || 400;
        next(err);
    });
};

exports.getByCity = function (req, res, next) {
    return ScreeningService.getScreenings({ 'cinema.city': req.params.city, start_time: { $gte: new Date() } }).select({ '_v': 0 })
        .populate('movie_id', 'title')
        .then((screenings) => {
            return res.send({
                result: screenings
            });
        }).catch((err) => {
            err.status = err.status || 400;
            next(err);
        });
};

exports.getByMovie = function (req, res, next) {

    return ScreeningService.getScreenings({ 'cinema.city': req.query.city, 'movie.title': req.params.title, start_time: { $gte: new Date() } }).select({ '_v': 0 })
        .populate('movie_id', 'title')
        .then((screenings) => {
            return res.send({
                result: screenings
            });
        }).catch((err) => {
            err.status = err.status || 400;
            next(err);
        });
};


