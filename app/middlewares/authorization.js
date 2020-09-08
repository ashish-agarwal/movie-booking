'use strict';
const AuthService = require('../services/auth.service');

const requiresLogin = function (req, res, next) {
    const authToken = req.headers.authorization;
    return AuthService.verifyToken(authToken)
        .then((user) => {
            req.user = user;
            return next();
        }).catch((err) => {
            err.status = 401;
            return next(err);
        });
};

exports.requiresLogin = requiresLogin;
