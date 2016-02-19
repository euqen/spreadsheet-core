import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './../config';
import logger from './logger';
import BaseMongoService from './baseMongoService';

class Mongo {
    constructor(mongo) {
        this.options = {
            auto_reconnect: true
        };

        this.mongo = mongo;
        this.mongo.Promise = global.Promise;
        this.db = this.mongo.connection;
        this.registerEvents();

        this.mongo.connect(config.mongo, this.options);
    }

    registerEvents() {
        this.db.on('connected', () => {
            logger.warn('Mongo connection is open to ' + config.mongo);
        });

        this.db.on('error', (err) => {
            logger.warn('Mongoose default connection error: ' + err);
        });

        this.db.on('disconnected', () => {
            logger.warn('Mongoose default connection disconnected');
        });
    }

    service(model, schema) {
        const collection = this.db.model(model, schema);

        return new BaseMongoService(collection, {});
    }
}

export default new Mongo(mongoose);