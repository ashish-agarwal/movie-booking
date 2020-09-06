'use strict';

const config = require('../../config/'),

    // Crypto Module
    crypto = require('crypto'),

    // Secret Keys
    cryptokey = config.CRYPTOKEY;

module.exports = {

    encrypt(payload) {
        const cipher = crypto.createCipher('aes-256-ctr', cryptokey);
        let crypted = cipher.update(payload.toString(), 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt(text) {
        const decipher = crypto.createDecipher('aes-256-ctr', cryptokey);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};
