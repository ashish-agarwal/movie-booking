'use strict';

const Cinema = require('../models/cinema');

exports.createCinema = function (cinema) {
    return Cinema.create(cinema);
};

exports.updateCinema = function (id, cinema) {
    return Cinema.findOneAndUpdate({
        _id: id,
        deleted: false
    }, cinema, {
        runValidators: true,
        new: true
    });
};

exports.getCinemas = function (query) {
    return Cinema.find(query);
};

exports.getCinemaById = function (id) {
    return Cinema.findById(id);
};
