import validate from './../../../utils/validator';
import validator from 'validator';
import {VALIDATION_MESSAGES} from './../../../utils/constants';
import userService from './../../user/user.service';
import roles from './../../../internal/roles';

export default function(req, res) {
    return validate((errors) => {
        const day = req.body.day;
        const time = req.body.time;
        const type = req.body.type;
        const teacher = req.body.teacher;
        const title = req.body.title;
        const auditory = req.body.auditory;

        if (!day) {
            errors.collect('email', 'Please specify day');
        }

        if (errors.hasErrors()) {
            return;
        }

        return userService.findOne({_id: teacher})
            .then(user => {
                if (!user) {
                    errors.collect('user', VALIDATION_MESSAGES.TEACHER_NOT_EXISTS);
                    return;
                }

                return {
                    day: day,
                    time: time,
                    type: type,
                    teacher: teacher,
                    title: title,
                    auditory: auditory
                }
            });

    }, req, res);
}