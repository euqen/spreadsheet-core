import validate from './../../../utils/validator';
import validator from 'validator';
import userService from './../../user/user.service';
import authService from './../../auth/auth.service';
import {VALIDATION_MESSAGES} from './../../../utils/constants';
import roles from './../../../internal/roles';

export default function(req, res) {
    return validate((errors) => {
        const userId = req.params.id;

        if (!userId) {
            errors.collect('user', 'Such user does not exists');
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

                return user;
            });

    }, req, res);
}