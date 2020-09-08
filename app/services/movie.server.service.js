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
    if (!id) {
        return Promise.reject(new Error('No movie id given'));
    }
    return Movie.findById(id);
};
