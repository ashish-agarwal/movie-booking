const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    config = require('./index'),
    helmet = require('helmet'),
    logger = require('morgan'),
    flash = require('express-flash');

const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const chalk = require('chalk');

const compression = require('compression');
const sessionOptions = {
    store: new MongoStore({
        url: config.db,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    }),
    key: 'auth_token',
    secret: 'supersecrectcodeforsecureserver',
    // cookie: config.cookieOptions,
    proxy: true,
    name: 'sid',
    resave: true,
    saveUninitialized: true
};

module.exports = function (app) {
    'use strict';
    app.set('showStackError', true);
    app.use(helmet());
    // Prettify HTML
    app.locals.pretty = true;
    app.use(flash());
    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
    }

    // Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'ejs');

    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());
    app.use(compression());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session(sessionOptions));

    // Load all the routes
    const appRoutes = require('../app/routes/app.routes');
    app.use('/', appRoutes);
    app.use('/api/v1/', require('../app/routes/app.v1.routes'));

    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), process.env.PORT || 3000, process.env.NODE_ENV);

    console.log('  Press CTRL-C to stop\n');
};
