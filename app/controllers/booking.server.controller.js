'use strict';

const CinemaService = require('./../services/cinema.server.service');
const BookingService = require('./../services/booking.server.service');

exports.create = function (req, res, next) {
    const bookingObj = req.body;
    return CinemaService.getCinemaById(bookingObj.cinema_id)
        .then((cinema) => {
            if (!cinema) {
                throw new Error('No cinema found with ' + bookingObj.cinema_id);
            }
            bookingObj.city = cinema.city;
            return BookingService.createBooking(bookingObj);
        }).then((booking) => {
            return res.send({
                result: booking,
                message: 'Booking created successfully'
            });
        }).catch((err) => {
            err.status = err.status || 400;
            next(err);
        });
};

