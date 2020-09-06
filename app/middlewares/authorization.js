'use strict';

const requiresLogin = function (req, res, next) {
    next();
};

exports.requiresLogin = requiresLogin;
