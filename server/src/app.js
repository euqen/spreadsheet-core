'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import express from 'express';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import config from './config';

const app = express();
const CLIENT_PATH = `${__dirname}/../../client/src/`;

app.set('views', CLIENT_PATH);
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(CLIENT_PATH));
app.use(logger.expressRequestsLogger);

require('./resources/react.routes')(app);
require('./resources/routes')(app);

app.listen(config.port, () => {
    console.log(`Spreadsheet application listening on port ${config.port}!`);
});