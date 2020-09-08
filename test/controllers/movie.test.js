'use strict';
const auth = require('../helpers/auth');
const config = require('../helpers/config');

describe('Movie APIs', () => {
    describe('GET /movies', () => {
        it('Valid ', (done) => {
            auth.get('/api/v1/movies')
                .then((res) => {
                    config.movie = res.result[0];
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
});
