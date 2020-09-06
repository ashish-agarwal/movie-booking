'use strict';

const Booking = require('../models/booking');

exports.createBooking = function (booking) {
    return Booking.create(booking);
};
exports.getBookings = function (query) {
    return Booking.find(query);
};

exports.getBookingById = function (id) {
    return Booking.findById(id);
};
