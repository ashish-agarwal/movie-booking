'use strict';

const CinemaService = require('./../services/cinema.server.service');
const ScreeningService = require('./../services/screening.server.service');

exports.create = function (req, res, next) {
    const screeningObj = req.body;
    return CinemaService.getCinemaById(screeningObj.cinema_id)
        .then((cinema) => {
            if (!cinema) {
                throw new Error('No cinema found with ' + screeningObj.cinema_id);
            }
            screeningObj.city = cinema.city;
            return ScreeningService.createScreening(screeningObj);
        }).then((screening) => {
            return res.send({
                result: screening,
                message: 'Screening created successfully'
            });
        }).catch((err) => {
            err.status = err.status || 400;
            next(err);
        });
};

