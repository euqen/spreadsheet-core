import jwt from 'jsonwebtoken';
import config from './../../config';
import crypto from 'crypto';
import generatePassword from 'password-generator';

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
    },

    generateSecurePassword: () => {
        return generatePassword(10, false);
    }
};

export default service;
