'use strict';

const ScreeningService = require('./../services/screening.server.service');

exports.create = function (req, res, next) {
    return ScreeningService.createScreening(req.body)
        .then((screening) => {
            return res.send({
                result: screening,
                message: 'Screening created successfully'
            });
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

