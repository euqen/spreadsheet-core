let config = {
    environment: 'development',
    port: 3000,
    baseUrl: 'localhost',
    mongo: 'mongodb://localhost:27017/spreadsheet-development',
    jwtSecretKey: 'this_is_super_secret_key',
    sessionPrivateKey: 'this_is supe*er_secret_key for session_storage',
    redis: {
        host: 'localhost',
        port: '6379',
        ttl: 60 * 3600 * 360
    }
};

const configuration = require(`./${process.env.NODE_ENV}`);
export default Object.assign(config, configuration);

