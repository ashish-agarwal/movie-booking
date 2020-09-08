'use strict';
const Promise = require('bluebird');

const CinemaService = require('./../services/cinema.server.service');
const SeatService = require('./../services/seat.server.service');

exports.create = function (req, res, next) {
    let cinema;
    return CinemaService.createCinema(req.body)
        .then((_cinema) => {
            cinema = _cinema;
            return Promise.resolve(req.body.seats || []);
        }).mapSeries((seat) => {
            seat.cinema_id = cinema._id;
            return SeatService.createSeat(seat);
        }).then(() => {
            return res.status(201).send({
                result: cinema,
                message: 'Cinema created successfully'
            });
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

exports.get = function (req, res, next) {
    return CinemaService.getCinemas(req.query)
        .then((cinemas) => {
            return res.send({
                result: cinemas
            });
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

