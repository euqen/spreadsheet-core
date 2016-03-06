import createValidator from './validators/user.create.validator';
import removeValidator from './validators/user.remove.validator';
import service from './user.service';

export default {
    create(req, res) {
        return createValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                   return;
                }

                return service.create(data.result);
            });
    },

    list(req, res) {
        const query = {
            isRemoved: false
        };

        return service.find(query);
    },

    remove(req, res) {
        return removeValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }
                return service.updateOne({_id: data.result._id}, doc => {
                   doc.isRemoved = true;
                });
            });
    }
}