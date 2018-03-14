let env = process.env.NODE_ENV;
let config = {
    port: process.env.PORT || 4000,
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/cmsThree',
    private_key: '123321'
}
if(env === 'test') {
    config.database = 'mongodb://localhost:27017/cmsThree_test';
}

module.exports = config;