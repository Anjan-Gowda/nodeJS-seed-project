const mongoose = require('mongoose'),
    config = require('../config/Config'),
    dburl = config.MONGO_URI;

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
const gracefulShutdown = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection
            .close()
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown()
        .then(() => {
            console.log('nodemon restart');
            process.kill(process.pid, 'SIGUSR2');
        })
        .catch(err => {
            console.error(err);
        });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown()
        .then(() => {
            console.log('App termination (SIGINT)');
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
        });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown()
        .then(() => {
            console.log('App termination (SIGTERM)');
            process.exit(0);
        })
        .catch(err => {
            console.error(err);
        });
});

mongoose.Promise = Promise;

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

const mongoURI = config.MONGO_URI;
mongoose.connect(mongoURI, option).then(function () {
    //connected successfully
    console.log('Successfully connected to the database');
}, function (err) {
    //err handle
    console.error(err);
});

require('../models/Product');



