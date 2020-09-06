'use strict';

const mongoose = require('mongoose'),
    config = require('./index');
const Promise = require('bluebird');
mongoose.Promise = Promise.Promise;
mongoose.set('useCreateIndex', true);
// Bootstrap db connection
let db = mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('DB connected ' + config.db);
});

mongoose.set('debug', process.env.NODE_ENV === 'development');

mongoose.connection.on('open', () => {
});

mongoose.connection.on('error', () => {
    setTimeout(() => {
        if (mongoose.connection.readyState === 0) {
            db = mongoose.connect(config.db);
        }
    }, 1000);
});

mongoose.connection.on('disconnected', () => {
    setTimeout(() => {
        if (mongoose.connection.readyState === 0) {
            db = mongoose.connect(config.db);
        }
    }, 1000);
});
