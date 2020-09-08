'use strict';

const auth = require('../helpers/auth');
const Screening = require('../../app/models/screening');
const Cinema = require('../../app/models/cinema');

const config = require('../helpers/config');
const moment = require('moment');

describe('Screening APIs', () => {
    // describe('GET /screenings', () => {
    //     it('Valid ', (done) => {
    //         auth.get('/api/v1/screenings')
    //             .then(() => {
    //                 done();
    //             }).catch((err) => {
    //                 done(err);
    //             });
    //     });
    // });
    describe('POST /screenings', () => {
        it('Valid Input', (done) => {
            auth.postValid('/api/v1/screening', {
                'cinema_id': config.cinema._id,
                'movie_id': config.movie._id,
                'start_time': new Date(),
                'end_time': moment().add(3, 'd').toDate()
            }).then((res) => {
                config.screening = res.result;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no cinema', (done) => {
            auth.postInvalid('/api/v1/screening', {
                'movie_id': config.movie._id,
                'start_time': new Date(),
                'end_time': moment().add(3, 'd').toDate()
            }).then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no start and end time', (done) => {
            auth.postInvalid('/api/v1/screening', {
                'cinema_id': config.cinema._id,
                'movie_id': config.movie._id
            }).then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no data', (done) => {
            auth.postInvalid('/api/v1/screening', {})
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
});
