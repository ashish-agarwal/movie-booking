const path = require('path');
const rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URL || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    jwtSecret: 'somesupersecretkey',
    refreshExpiry: '3d',
    CRYPTOKEY: 'somesupersecretkey',
    authExpiry: '1d'
};
