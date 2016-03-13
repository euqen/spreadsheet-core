import saveValidator from './validators/schedule.save.validator';
import service from './schedule.service';

export default {
    save(req, res) {
        return saveValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }

                return service.create(data.result);
            });
    },

    list(req, res) {
        return service.find({});
    },

    remove(req, res) {
        //return removeValidator(req, res)
        //    .then(data => {
        //        if (!data.isValid) {
        //            return;
        //        }
        //        return service.updateOne({_id: data.result._id}, doc => {
        //            doc.isRemoved = true;
        //        });
        //    });
    }
}