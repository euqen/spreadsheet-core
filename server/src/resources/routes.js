'use strict';

import jwt from 'express-jwt';
import config from './../config';
import {responseMiddlewareExtension} from './../utils/extensions';
import {authorizationMiddleware} from './../utils/extensions';
import {globalErrorHandler} from './../utils/extensions';

export default function(app) {
    app.use(responseMiddlewareExtension);

    /** Public routes **/
    app.use('/api/v1/auth', require('./auth'));

    /** Authorization **/
    app.use(authorizationMiddleware);
    app.use(jwt({secret: config.jwtSecretKey })/*.unless({ path: publicRouteRegexs })*/);

    /** Private routes **/
    app.use('/api/v1/user', require('./user'));
    app.use('/api/v1/schedule', require('./schedule'));
    app.use('/api/v1/group', require('./group'));
    app.use('/api/v1/subject', require('./subject'));
    app.use(globalErrorHandler);
}