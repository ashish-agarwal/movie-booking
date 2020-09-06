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
            return res.send({ result: user, message: 'user created successfully' });
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
            tokens.refreshToken = AuthService.createRefreshToken(user);
            res.send({
                sucess: true,
                result: user,
                tokens
            });
        })
        .catch((err) => {
            err.status = 400;
            next(err);
        });
};

exports.getProfile = function (req, res, next) {
    const userObj = req.body;
    UserService.getProfile(userObj)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            err.status = 400;
            next(err);
        });
};

exports.updateProfile = function (req, res, next) {
    const userObj = req.body;
    UserService.updateProfile(userObj)
        .then((user) => {
            res.send(user);
        }).catch((err) => {
            err.status = 400;
            next(err);
        });
};

exports.getAllUsers = function (req, res, next) {
    UserService.getUsers({}).then((users) => {
        return res.send({
            result: users
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
            result: users[0]
        });
    }).catch((err) => {
        err.status = 400;
        next(err);
    });
};
