'use strict';

const auth = require('../helpers/auth');
const config = require('../helpers/config');

describe('Cinema APIs', () => {
    describe('GET /cinemas', () => {
        it('Valid ', (done) => {
            auth.get('/api/v1/cinemas')
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
    describe('POST /cinemas', () => {
        it('Valid Input', (done) => {
            auth.postValid('/api/v1/cinema', {
                'name': 'PVR Hebel',
                'city': 'Bangalore',
                'address': 'Hebel'
            }).then((res) => {
                config.cinema = res.result;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no name', (done) => {
            auth.postInvalid('/api/v1/cinema', {
                'city': 'Bangalore',
                'address': 'Hebel'
            }).then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('Input with no data', (done) => {
            auth.postInvalid('/api/v1/cinema', {})
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
});
