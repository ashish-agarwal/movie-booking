'use strict';

const config = require('../../config/'),

    // Crypto Module
    crypto = require('crypto'),

    // Secret Keys
    cryptokey = config.CRYPTOKEY;

const algorithm = 'aes-256-ctr';

const IV_LENGTH = 16;

const ENCRYPTION_KEY = crypto.createHash('sha256').update(String(cryptokey)).digest('base64').substr(0, 32);

module.exports = {

    encrypt(payload) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(algorithm, ENCRYPTION_KEY, iv);
        let encrypted = cipher.update(payload.toString());
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    },

    decrypt(text) {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(algorithm, ENCRYPTION_KEY, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();

    }
};
