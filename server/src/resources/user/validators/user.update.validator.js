import validate from './../../../utils/validator';
import validator from 'validator';
import userService from './../../user/user.service';
import authService from './../../auth/auth.service';
import {VALIDATION_MESSAGES} from './../../../utils/constants';
import roles from './../../../internal/roles';

export default function(req, res) {
    return validate((errors) => {
        const userId = req.params.id;
        const firstName = validator.trim(req.body.firstName);
        const lastName = validator.trim(req.body.lastName);
        const middleName = validator.trim(req.body.middleName);

        if (!userId) {
            errors.collect('user', 'Such user does not exists');
        }

        if (!firstName || !lastName || !middleName) {
            errors.collect('name', 'Please specify first name, last name and middle name');
        }

        if (errors.hasErrors()) {
            return;
        }

        return userService.findOne({_id: userId})
            .then(user => {
                if (!user) {
                    errors.collect('user', 'Such user does not exists');
                    return;
                }

                return {
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName
                };
        });

    }, req, res);
}