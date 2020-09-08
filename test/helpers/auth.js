'use strict';

const app = require('./../../app');
const { expect } = require('chai');
const request = require('supertest');


module.exports = {


    postValid: (url, body) => {
        return request(app).post(url)
            .send(body)
            .then((res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.have.own.property('message');
                return res.body;
            });
    },
    postInvalid: (url, body) => {
        return request(app).post(url)
            .send(body)
            .then((res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.have.own.property('message');
                return res.body;
            });
    },
    post: (url, body) => {
        return request(app).post(url)
            .send(body)
            .then((res) => {
                return res.body;
            });
    },

    get: (url) => {
        return request(app).get(url)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.own.property('result');
                return res.body;
            });
    }
};


