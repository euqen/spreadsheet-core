'use strict';

import jwt from 'express-jwt';
import config from './../config';
import {responseMiddlewareExtension} from './../utils/extensions';

export default function(app) {
    app.use(responseMiddlewareExtension);
    app.use('/api/v1/auth', require('./auth'));

    app.use(function(req, res, next) {
       if (req.headers.authorization || req.query.authorization) {
           next();
           return;
       }

       res.sendAuthorizationError();
    });

    app.use(jwt({secret: config.jwtSecretKey })/*.unless({ path: publicRouteRegexs })*/);
}