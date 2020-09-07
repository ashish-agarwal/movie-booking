const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const CryptoService = require('../services/crypto.service');

exports.createToken = function (user) {
    // Create a Token and send the response
    const userDetails = {
        name: user.firstName,
        role: user.role,
        _id: CryptoService.encrypt(user._id)
    };
    const token = jwt.sign(userDetails, config.jwtSecret, {
        expiresIn: config.authExpiry
    });
    return token;
};

exports.verifyToken = function (token) {
    return new Promise(((resolve, reject) => {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            decoded._id = CryptoService.decrypt(decoded._id);
            return resolve(decoded);
        });
    }));
};
