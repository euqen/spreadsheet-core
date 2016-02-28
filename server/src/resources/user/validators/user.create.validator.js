import validate from './../../../utils/validator';
import validator from 'validator';
import userService from './../../user/user.service';
import authService from './../../auth/auth.service';
import {VALIDATION_MESSAGES} from './../../../utils/constants';

export default function(req, res) {
    return validate((errors) => {
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const middleName = req.body.middleName;
        const role = req.body.role;
        const group = req.body.group;

        if (!email) {
            errors.collect('email', 'Please specify email');
        } else if (!validator.isEmail(email)) {
            errors.collect('email', 'Please specify correct email address');
        }

        if (!firstName || !lastName || !middleName) {
            errors.collect('name', 'Please specify first name, last name and middle name');
        }

        if (!role) {
            errors.collect('role', 'Please specify user role');
        } else if (role === 'student' && !group) {
             errors.collect('group', 'Please specify student group');
        }

        if (errors.hasErrors()) {
            return;
        }

        return userService.findOne({email: email})
            .then(user => {
                if (user) {
                    errors.collect('user', VALIDATION_MESSAGES.INCORRECT_CREDENTIALS);
                    return;
                }

                const password = authService.generateSecurePassword();

                return {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    password: authService.generateHash(password),
                    rawPassword: password,
                    role: role
                }
            });

    }, req, res);
}