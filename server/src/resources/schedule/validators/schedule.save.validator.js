import validate from './../../../utils/validator';
import validator from 'validator';
import {VALIDATION_MESSAGES} from './../../../utils/constants';
import userService from './../../user/user.service';
import groupService from './../../group/group.service';
import roles from './../../../internal/roles';

export default function(req, res) {
    return validate((errors) => {
        const day = req.body.day;
        const time = req.body.time;
        const type = req.body.type;
        const teacher = req.body.teacher;
        const title = req.body.title;
        const group = req.body.group;
        const auditory = req.body.auditory;

        if (!day) {
            errors.collect('email', 'Please specify correct day');
        }

        if (!time) {
            errors.collect('time', 'Please specify time');
        }

        if (!type) {
            errors.collect('type', 'Please specify type');
        }

        if (!auditory) {
            errors.collect('auditory', 'Please specify auditory');
        }

        if (!teacher) {
            errors.collect('teacher', 'Please specify teacher');
        }

        if (!group) {
            errors.collect('teacher', 'Please specify group');
        }

        if (errors.hasErrors()) {
            return;
        }

        const result = {
            day: day,
            time: time,
            type: type,
            title: title,
            auditory: auditory
        };

        return userService.findOne({_id: teacher})
            .then(user => {
                if (!user) {
                    errors.collect('user', VALIDATION_MESSAGES.TEACHER_NOT_EXISTS);
                    return;
                }

                result.teacher = {
                    _id: user._id.toString(),
                    fullName: `${user.firstName} ${user.lastName}`
                };

                return groupService.findOne({_id: group});
            })
            .then(group => {
                if (!group) {
                    errors.collect('user', VALIDATION_MESSAGES.GROUP_NOT_EXISTS);
                    return;
                }

                result.group = {
                    _id: group._id.toString(),
                    number: group.groupNumber
                };

                return result;
            });

    }, req, res);
}