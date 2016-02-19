import validate from './../../../utils/validator';
import validator from 'validator';
import userService from './../../user/user.service';
import authService from './../auth.service';
import {VALIDATION_MESSAGES} from './../../../utils/constants';

export default function(req, res) {
    return validate((errors) => {
        let email = req.body.email;
        let password = req.body.password;

        if (!email) {
            errors.collect('email', 'Please specify email');
        } else if (!validator.isEmail(email)) {
            errors.collect('email', 'Please specify correct email address');
        }

        if (!password) {
            errors.collect('password', 'Please specify password');
        } else if (validator.isLength(password, {min: 6, max: 25})) {
            errors.collect('password', 'Password should contain from 6 to 25 symbols');
        }

        if (errors.hasErrors()) {
            return;
        }

        return userService.findOne({email: email})
            .then(user => {
                if (!user) {
                    errors.collect('user', VALIDATION_MESSAGES.INCORRECT_CREDENTIALS);
                    return;
                }

                const hash = authService.generateHash(password);

                if (user.hashedPassword !== hash) {
                    errors.collect('user', VALIDATION_MESSAGES.INCORRECT_CREDENTIALS);
                    return;
                }

                return {email, password};
            });

    }, req, res);
}