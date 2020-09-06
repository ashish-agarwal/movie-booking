'use strict';

const Screening = require('../models/screening');

exports.createScreening = function (screening) {
    return Screening.create(screening);
};

exports.updateScreening = function (id, screening) {
    return Screening.findOneAndUpdate({
        _id: id,
        deleted: false
    }, screening, {
        runValidators: true,
        new: true
    });
};

exports.getScreenings = function (query) {
    return Screening.find(query);
};

exports.getScreeningById = function (id) {
    return Screening.findById(id);
};
