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
    if (!id) {
        return Promise.reject(new Error('No cinema id given'));
    }
    return Cinema.findById(id)
        .then((cinema) => {
            if (!cinema) {
                throw new Error('No cinema found with ' + id);
            }
            return cinema;
        });
};
