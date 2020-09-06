'use strict';

const MovieService = require('./../services/movie.server.service');

exports.getMovies = function (req, res, next) {
    return MovieService.getMovies({}).limit(100)
        .then((movies) => {
            return res.send({
                result: movies
            });
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

