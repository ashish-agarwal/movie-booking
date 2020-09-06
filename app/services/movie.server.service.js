'use strict';

const Movie = require('../models/movie');

exports.updateMovie = function (id, movie) {
    return Movie.findOneAndUpdate({
        _id: id,
        deleted: false
    }, movie, {
        runValidators: true,
        new: true
    });
};

exports.getMovies = function (query) {
    return Movie.find(query);
};

exports.getMovieById = function (id) {
    return Movie.findById(id);
};
