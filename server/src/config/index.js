let config = {
    environment: 'development'
};

const configuration = require(`./${process.env.NODE_ENV}`);
export default Object.assign(config, configuration);

