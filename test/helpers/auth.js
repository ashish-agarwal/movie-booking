'use strict';

const app = require('./../../app');
const { expect } = require('chai');
const request = require('supertest');


module.exports = {


    postValid: (url, body, authToken) => {
        const req = request(app).post(url);
        if (authToken) {
            req.set('authorization', authToken);
        }
        return req.send(body)
            .then((res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.have.own.property('message');
                return res.body;
            });
    },
    postInvalid: (url, body, authToken) => {
        const req = request(app).post(url);
        if (authToken) {
            req.set('authorization', authToken);
        }
        return req.send(body)
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

    postCheckAuth: (url, body, authToken) => {
        const req = request(app).post(url);
        if (authToken) {
            req.set('authorization', authToken);
        }
        return req.send(body)
            .send(body)
            .then((res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.have.own.property('message');
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
    },
    getInvalid: (url) => {
        return request(app).get(url)
            .then((res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.have.own.property('message');
                return res.body;
            });
    }
};


