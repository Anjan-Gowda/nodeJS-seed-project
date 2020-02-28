require('./api/config/DBConnection');
const express = require('express'),
    logger = require('morgan'),
    cors = require('cors'),
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes');
const errorLog = require('./api/utils/ErrorLogger');
app = express();

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    })
);
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorLog);

// 500 internal server error handler
app.use((err, req, res, next) => {
    if (err.statusCode === 404) return next();
    res.status(500).json({
        // Never leak the stack trace of the err if running in production mode
        err: process.env.NODE_ENV === 'production' ? null : err,
        msg: '500 Internal Server Error',
        data: null
    });
});

// 404 error handler
app.use((req, res) => {
    res.status(404).json({
        err: null,
        msg: '404 Not Found',
        data: null
    });
});

module.exports = app;
