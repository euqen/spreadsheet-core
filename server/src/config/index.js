let config = {
    environment: 'development',
    port: 3000,
    baseUrl: 'localhost',
    mongo: 'mongodb://localhost:27017/spreadsheet-development',
    jwtSecretKey: 'this_is_super_secret_key'
};

const configuration = require(`./${process.env.NODE_ENV}`);
export default Object.assign(config, configuration);

