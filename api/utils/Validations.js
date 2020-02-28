const mongoose = require('mongoose');

module.exports.isString = str => {
    return typeof str === 'string';
};

module.exports.isNumber = num => {
    return !isNaN(num);
};

module.exports.isBoolean = bool => {
    return (
        bool === true ||
        bool === false ||
        toString.call(bool) === '[object Boolean]'
    );
};

module.exports.isObject = obj => {
    return typeof obj === 'object';
};

module.exports.isArray = arr => {
    return Array.isArray(arr);
};

module.exports.isObjectId = id => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports.matchesRegex = (str, regex) => {
    return regex.test(str);
};
