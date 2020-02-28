const bcrypt = require('bcryptjs');

module.exports.hashPassword = password => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    });
};

module.exports.comparePasswordToHash = (candidatePassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, hash, (err, matches) => {
            if (err) return reject(err);
            resolve(matches);
        });
    });
};
