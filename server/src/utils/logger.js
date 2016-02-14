'use strict';

import winston from 'winston';
import expressWinston from 'express-winston';
import winstonLoggly from 'winston-loggly';
import config from './../config';

class Logger {
    constructor() {
        this.transports = [];
        this.errorTransports = [];
        this.logger = {};

        this.transports.push(new(winston.transports.Console)({colorize: true}));
        this.errorTransports.push(new(winston.transports.Console)({colorize: true, json: true}));

        this.addLogglyTransport();
        this.configure();
    }

    addLogglyTransport() {
        if (config.loggly) {
            console.log(`Adding loggly logger for winston`);

            let logglyTransport = new (winston.transports.Loggly)(config.loggly);
            this.transports.push(logglyTransport);
            this.errorTransports.push(logglyTransport);
        }
    }

    configure() {
        this.logger = new(winston.Logger)({
            exitOnError: false,
            transports: this.transports
        });

        this.setExpressWinstonConfig();

        this.logger.expressRequestsLogger = expressWinston.logger(this.config);
        this.logger.expressErrorLogger = expressWinston.errorLogger({
            transports: this.errorTransports,
            dumpExceptions: true,
            showStack: true
        });
    }

    setExpressWinstonConfig() {
        this.config = {
            transports: this.transports,
            meta: config.environment !== 'development',
            msg: '{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}'
        };
    }
}

export default new Logger().logger;