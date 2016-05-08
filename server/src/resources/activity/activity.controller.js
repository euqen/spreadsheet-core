//import saveValidator from './validators/schedule.save.validator';
import service from './activity.service';
import userService from './../user/user.service';
import scheduleService from './../schedule/schedule.service';

export default {

    getStudents(req, res) {
        let query = {};

        if (req.query.groupId) {
            query.group = req.query.groupId;
        }

        return userService.find(query);
    },

    getSchedules(req, res) {
        let query = {};

        if (req.query.groupId && req.query.teacherId && req.query.subjectId) {
            query.group._id = req.query.groupId;
            query.teacher._id = req.query.teacherId;
            query.subject._id = req.query.subjectId;
        }

        return scheduleService.find(query);
    },

}