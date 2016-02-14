'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import express from 'express';
import logger from './utils/logger';

const app = express();
const CLIENT_PATH = `${__dirname}/../../client/src/`;

app.set('views', CLIENT_PATH);
app.engine('html', require('ejs').renderFile);

app.use(express.static(CLIENT_PATH));
app.use(logger.expressRequestsLogger);

require('./resources/routes')(app);

app.listen(3000, () => {
    console.log('Spreadsheet application listening on port 3000!');
});