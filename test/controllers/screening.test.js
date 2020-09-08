'use strict';

const auth = require('../helpers/auth');
const Screening = require('../../app/models/screening');
const Cinema = require('../../app/models/cinema');
const config = require('../helpers/config');

const moment = require('moment');
const { expect } = require('chai');

describe('Screening APIs', () => {
    describe('POST /screenings', () => {
        it('Valid Input', (done) => {
            auth.postValid('/api/v1/screening', {
                'cinema_id': config.cinema._id,
                'movie_id': config.movie._id,
                'start_time': moment().add(3, 'd').toDate(),
                'end_time': moment().add(6, 'd').toDate()
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
    describe('GET screenings for a city', () => {
        it('Valid city name ', (done) => {
            auth.get('/api/v1/screenings/city/hyderabad')
                .then((res) => {
                    expect(res.result).to.have.lengthOf.at.least(1);
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('InValid city name ', (done) => {
            auth.get('/api/v1/screenings/city/hyderab')
                .then((res) => {
                    expect(res.result).to.have.lengthOf(0);
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
    describe('GET screenings for a movie', () => {
        it('Valid movie name ', (done) => {
            auth.get('/api/v1/screenings/movie/' + config.movie.title + '?city=hyderabad')
                .then((res) => {
                    expect(res.result).to.have.lengthOf.at.least(1);
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('InValid movie name ', (done) => {
            auth.get('/api/v1/screenings/movie/hyderab?city=hyderabad')
                .then((res) => {
                    expect(res.result).to.have.lengthOf(0);
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
});
