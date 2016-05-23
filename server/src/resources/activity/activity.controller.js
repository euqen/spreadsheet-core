import service from './activity.service';
import userService from './../user/user.service';
import scheduleService from './../schedule/schedule.service';
import saveValidator from './validators/activity.save.validator';

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
            query['group._id'] = req.query.groupId;
            query['teacher._id'] = req.query.teacherId;
            query['subject._id'] = req.query.subjectId;
        }

        return scheduleService.find(query);
    },

    save(req, res) {
        return saveValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }

                let query = {};

                query.studentId = data.result.studentId;
                query.date = data.result.date;
                query.time = data.result.time;
                query.subjectId = data.result.subjectId;

                service.findOne(query).then(oldRecord => {
                    if (oldRecord) {
                        return service.updateOne({_id: oldRecord._id}, doc => {
                            doc.value = data.result.value;
                            doc.presence = data.result.presence;
                        });
                    } else {
                        return service.create(data.result);
                    }
                });
            });
    },

    getActivities(req, res) {
        let query = {};

        if (req.query.teacherId && req.query.date && req.query.time && req.query.subjectId) {
            query.teacherId = req.query.teacherId;
            query.date = req.query.date;
            query.time = req.query.time;
            query.subjectId = req.query.subjectId;
        }
        
        return service.find(query);
    },

}