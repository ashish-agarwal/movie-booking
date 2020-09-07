'use strict';
const AuthService = require('../services/auth.service');

const requiresLogin = function (req, res, next) {
    const authToken = req.headers.authorization;
    return AuthService.verifyToken(authToken)
        .then((user) => {
            req.user = user;
            return next();
        }).catch((err) => {
            console.error(err);
            return res.status(401).send({ message: err.message });
        });
};

exports.requiresLogin = requiresLogin;
