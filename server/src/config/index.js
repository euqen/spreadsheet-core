let config = {
    environment: 'development',
    port: 3000,
    baseUrl: 'localhost'
};

const configuration = require(`./${process.env.NODE_ENV}`);
export default Object.assign(config, configuration);

