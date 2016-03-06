import constants from './constants';
import authService from './../resources/auth/auth.service';

export function responseMiddlewareExtension(req, res, next) {
    res.sendAuthorizationError = () => {
        const response = {
            code: constants.ERROR_CODES.AUTHORIZATION_ERROR,
            message: constants.ERROR_MESSAGES.AUTHORIZATION_ERROR
        };

        res.status(401).send(response);
    };

    res.sendPermissionError = () => {
        const response = {
            code: constants.ERROR_CODES.PERMISSION_ERROR,
            message: constants.ERROR_MESSAGES.PERMISSION_ERROR
        };

        res.status(405).send(response);
    };

    next();
}

export function authorizationMiddleware(req, res, next) {
    if (req.headers.authorization || req.query.authorization) {
        next();
        return;
    }

    res.sendAuthorizationError();
}

export function pageAccessMiddleware(req, res, next) {
    if (!req.session || !req.session.token) {
        req.path === '/' ? next() : res.redirect('/');
    } else {
        req.path === '/' ? res.redirect('/dashboard') : next();
    }
}

export function globalErrorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    } else {
        res.status(400).send('err');
    }
}
