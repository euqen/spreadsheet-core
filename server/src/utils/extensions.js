import constants from './constants';

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

export function autorizationMiddleware(req, res, next) {
    if (req.headers.authorization || req.query.authorization) {
        next();
        return;
    }

    res.sendAuthorizationError();
}