'use strict';
const auth = require('../helpers/auth');


describe('Movie APIs', () => {
    describe('GET /movies', () => {
        it('Valid ', (done) => {
            auth.get('/api/v1/movies')
                .then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
        });
    });
});
