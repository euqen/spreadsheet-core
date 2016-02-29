'use strict';

import jwt from 'express-jwt';
import config from './../config';
import {responseMiddlewareExtension} from './../utils/extensions';
import {autorizationMiddleware} from './../utils/extensions';

export default function(app) {
    app.use(responseMiddlewareExtension);
    app.use('/api/v1/auth', require('./auth'));
    app.use('/api/v1/user', require('./user'));

    app.use(autorizationMiddleware);
    app.use(jwt({secret: config.jwtSecretKey })/*.unless({ path: publicRouteRegexs })*/);

}