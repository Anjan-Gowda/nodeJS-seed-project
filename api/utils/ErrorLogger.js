const fs = require('fs');
let logger = function (err, req, res, next) {
    if (err) {
        let logError = `${new Date()} - ${req.method}: ${req.url} \n - ${err.stack}\n\n`;

        fs.appendFile('./logs/ErrorLogger.txt', logError, (error) => {
            if (error) {
                console.log("logging error failed");
            }
        });
        if (err.status) {
            res.status(err.status);
        }
        else {
            res.status(500);
        }
        res.json({ "message": err.message })
    }
    next();
}
module.exports = logger;