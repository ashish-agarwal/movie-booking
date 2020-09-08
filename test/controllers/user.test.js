'use strict';

const auth = require('../helpers/auth');
const Screening = require('../../app/models/screening');
const Cinema = require('../../app/models/cinema');
const config = require('../helpers/config');
const { expect } = require('chai');

describe('User APIs', () => {
    describe('User registration', () => {
        it('Valid Input', (done) => {
            auth.postValid('/api/v1/register', config.sUser).then((res) => {
                config.user = res.result;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no email', (done) => {
            const buffer = JSON.parse(JSON.stringify(config.sUser));
            delete buffer.email;
            auth.postInvalid('/api/v1/register', buffer)
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('Input with no data', (done) => {
            auth.postInvalid('/api/v1/register', {})
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
    describe('User Login', () => {
        it('Valid Input', (done) => {
            auth.post('/api/v1/login', config.sUser).then((res) => {
                expect(res).to.have.property('tokens');
                config.authToken = res.tokens.authToken;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no email', (done) => {
            const buffer = JSON.parse(JSON.stringify(config.sUser));
            delete buffer.email;
            auth.postInvalid('/api/v1/login', buffer)
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
        it('Input with no data', (done) => {
            auth.postInvalid('/api/v1/login', {})
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
