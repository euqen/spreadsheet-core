import createValidator from './validators/user.create.validator';
import removeValidator from './validators/user.remove.validator';
import updateValidator from './validators/user.update.validator';
import service from './user.service';
import languages from './../../internal/languages';

export default {
    create(req, res) {
        return createValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                   return;
                }
                data.result.locale = languages.en;
                return service.create(data.result);
            });
    },

    list(req, res) {
        const query = {
            isRemoved: false
        };

        if (req.query.role) {
            query.role = req.query.role;
        }

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
    },

    current(req, res) {
        return service.findOne({email: req.user.email});
    },

    changeLocale(req, res) {
        return service.updateOne({_id: req.user._id}, doc => {
            doc.locale = req.body.locale;
        });
    },

    updateUser(req, res) {
        return updateValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }
                return service.updateOne({_id: req.user._id}, doc => {
                    doc.firstName = req.body.data.firstName;
                    doc.middleName = req.body.data.middleName;
                    doc.lastName = req.body.data.lastName;
                    if(!req.body.group) {
                        doc.group = req.body.data.group;
                    }
                });
            });
    }
    
}