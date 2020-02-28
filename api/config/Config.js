module.exports = {
    FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
    MONGO_URI: process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost:27017/seed-project'
};
