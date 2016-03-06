import createValidator from './validators/user.create.validator';
import removeValidator from './validators/user.remove.validator';
import service from './user.service';

class UserController {
    create(req, res) {
        return createValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                   return;
                }

                return service.create(data.result);
            })
            .then(data => res.send(data))
            .catch(error => res.status(500).send('err'));
    }

    list(req, res) {
        const query = {
            isRemoved: false
        };


        return service.find(query)
            .then(users => {
                res.send(users);
            });
    }

    remove(req, res) {
        return removeValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }
                return service.updateOne({_id: data.result._id}, doc => {
                   doc.isRemoved = true;
                });
            })
            .then(user => res.send(user))
            .catch(error => res.status(500).send('err'))
    }
}

export default new UserController();