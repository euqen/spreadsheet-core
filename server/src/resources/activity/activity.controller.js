//import saveValidator from './validators/schedule.save.validator';
import service from './activity.service';
import userService from './../user/user.service';

export default {

    getStudents(req, res) {
        let query = {};

        if (req.query.groupId) {
            query.group = req.query.groupId;
        }

        return userService.find(query);
    },

}