'use strict';

const Seat = require('../models/seat');

exports.createSeat = function (seat) {
    return Seat.create(seat);
};

exports.updateSeat = function (id, seat) {
    return Seat.findOneAndUpdate({
        _id: id,
        deleted: false
    }, seat, {
        runValidators: true,
        new: true
    });
};

exports.getSeats = function (query) {
    return Seat.find(query);
};

exports.getSeatById = function (id) {
    return Seat.findById(id);
};
