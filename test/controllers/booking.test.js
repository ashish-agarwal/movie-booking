
'use strict';
process.env.NODE_ENV = 'qa';
const auth = require('../helpers/auth');
const Screening = require('../../app/models/booking');
const Cinema = require('../../app/models/cinema');
const Booking = require('../../app/models/booking');
const config = require('../helpers/config');

const moment = require('moment');
const { expect } = require('chai');

const reservedSeats = {
    'seat': '5',
    'row': 'A'
};
before(async () => {
    const [user, cinema, movies] = await Promise.all([
        auth.post('/api/v1/login', config.testUser),
        auth.postValid('/api/v1/cinema', {
            'name': 'PVR Hebel',
            'city': 'hyderabad',
            'address': 'Hebel',
            seats: [
                { row: 'A', seat: '5' },
                { row: 'A', seat: '2' },
                { row: 'A', seat: '3' },
                { row: 'A', seat: '4' }
            ]
        }),
        auth.get('/api/v1/movies')
    ]);

    config.authToken = user.tokens.authToken;
    config.cinema = cinema.result;
    config.movie = movies.result[0];
    const screening = await auth.postValid('/api/v1/screening', {
        'cinema_id': config.cinema._id,
        'movie_id': config.movie._id,
        'start_time': moment().add(2, 'd').toDate(),
        'end_time': moment().add(5, 'd').toDate()
    });

    config.screening = screening.result;
});

describe('Booking APIs', () => {

    describe('POST /booking', () => {
        it('Input with no auth', (done) => {
            auth.postCheckAuth('/api/v1/booking', {})
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('Valid Input', (done) => {

            auth.postValid('/api/v1/booking', {
                'screening_id': config.screening._id,
                'cinema_id': config.cinema._id,
                'seat': reservedSeats
            }, config.authToken)
                .then((res) => {
                    config.booking = res.result;
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('Input with no cinema', (done) => {
            auth.postInvalid('/api/v1/booking', {
                'screening_id': config.screening._id,
                'seat': {
                    'seat': '5',
                    'row': 'A'
                }
            }, config.authToken).then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no seat', (done) => {
            auth.postInvalid('/api/v1/booking', {
                'screening_id': config.screening._id,
                'cinema_id': config.cinema._id
            }, config.authToken).then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no data', (done) => {
            auth.postInvalid('/api/v1/booking', {}, config.authToken)
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });

    describe('Check Seats', () => {
        it('Check RESERVED seat with valid screening Id ', (done) => {
            auth.get('/api/v1/screening/' + config.screening._id + '/seats')
                .then((res) => {
                    const reserved = res.result.find((seat) => seat.row === reservedSeats.row && seat.seat === reservedSeats.seat);
                    expect(reserved.status).to.equal('RESERVED');
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('Check AVAILABLE seat with valid screening Id ', (done) => {
            auth.get('/api/v1/screening/' + config.screening._id + '/seats')
                .then((res) => {
                    const available = res.result.find((seat) => seat.row !== reservedSeats.row || seat.seat !== reservedSeats.seat);
                    expect(available.status).to.equal('AVAILABLE');
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('Check AVAILABLE seat with invalid screening Id ', (done) => {
            auth.getInvalid('/api/v1/screening/123/seats')
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });


});
after(async () => {
    config.cinema && config.cinema._id && await Cinema.deleteOne({ _id: config.cinema._id });
    config.screening && config.screening._id && await Screening.deleteOne({ _id: config.screening._id });
    config.booking && config.booking._id && await Booking.deleteOne({ _id: config.booking._id });
});
