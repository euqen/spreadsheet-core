import jwt from 'jsonwebtoken';
import config from './../../config';
import crypto from 'crypto';

const service = {

    generateSecureToken: payload => {
        return jwt.sign(payload, config.jwtSecretKey, {});
    },

    decodeSecureToken: token => {
        let res = null;

        try {
            res = jwt.verify(token, config.jwtSecretKey);
        } catch (err) {
            console.log('Invalid json web token', err);
        }

        return res;
    },

    generateHash: (data) => {
        const hash = crypto.createHash('sha256');
        hash.update(data);

        return hash.digest('hex');
    }
};

export default service;
