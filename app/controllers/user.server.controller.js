'use strict';

const UserService = require('../services/user.server.service');
const AuthService = require('../services/auth.service');

exports.registerUser = function (req, res, next) {
    const userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    UserService.register(userObj)
        .then((user) => {
            return res.status(201).send({ result: user.toJSON(), message: 'user created successfully' });
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

exports.authenticate = function (req, res, next) {
    const userObj = req.body;
    UserService.authenticate(userObj, req.body.devicetoken)
        .then((user) => {
            const tokens = {};
            tokens.authToken = AuthService.createToken(user);
            res.send({
                sucess: true,
                result: user.toJSON(),
                tokens
            });
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

exports.getUser = function (req, res, next) {
    UserService.getUsers({
        _id: req.params.id
    }).then((users) => {
        return res.send({
            result: users[0].toJSON()
        });
    }).catch((err) => {
        err.status = 400;
        next(err);
    });
};
