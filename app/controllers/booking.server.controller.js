'use strict';
const Promise = require('bluebird');

const SeatService = require('./../services/seat.server.service');
const ScreeningService = require('./../services/screening.server.service');
const BookingService = require('./../services/booking.server.service');

exports.create = function (req, res, next) {
    let bookingObj = req.body;
    if (!bookingObj.seat || !bookingObj.seat.row || !bookingObj.seat.seat) {
        return res.status(400).send({ message: 'Please select a seat' });
    }
    return Promise.props({
        bookings: BookingService.getBookings({
            'seat.row': bookingObj.seat.row, 'seat.seat': bookingObj.seat.seat,
            screening_id: bookingObj.screening_id
        }),
        seats: SeatService.getSeats({
            'row': bookingObj.seat.row, 'seat': bookingObj.seat.seat,
            cinema_id: bookingObj.cinema_id
        }).lean()
    }).then(({ bookings, seats }) => {
        if (seats.length === 0) {
            throw new Error('Invalid Seat selected');
        }
        if (bookings.length > 0) {
            throw new Error('Seat is already booked');
        }
        return ScreeningService.getScreeningById(bookingObj.screening_id).select({ cinema: 1, movie: 1, _id: 0 }).lean();
    }).then((screening) => {
        bookingObj = { ...bookingObj, ...screening };
        bookingObj.booking_at = new Date();
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

