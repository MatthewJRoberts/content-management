module.exports = {
    port: process.env.PORT || 4000,
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/cms',
    private_key: 'PRIVATE_KEY_SET'
};