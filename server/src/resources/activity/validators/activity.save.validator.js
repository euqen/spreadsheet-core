import validate from './../../../utils/validator';
import validator from 'validator';
import {VALIDATION_MESSAGES} from './../../../utils/constants';
import userService from './../../user/user.service';
import groupService from './../../group/group.service';
import subjectService from './../../subject/subject.service';
import roles from './../../../internal/roles';

export default function(req, res) {
    return validate((errors) => {
        const studentId = req.body.studentId;
        const createdOn = req.body.createdOn;
        const teacherId = req.body.teacherId;
        const date = req.body.date;
        const time = req.body.time;
        const subjectId = req.body.subjectId;
        const value = req.body.value;
        const presence = req.body.presence;

        const result = {
            studentId: studentId,
            createdOn: createdOn,
            teacherId: teacherId,
            date: date,
            time: time,
            subjectId: subjectId,
            value: value,
            presence: presence
        };

        return result;
    }, req, res);
}