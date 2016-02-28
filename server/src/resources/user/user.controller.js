import createValidator from './validators/user.create.validator';
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
        return service.find({})
            .then(users => {
                res.send(users);
            });
    }
}

export default new UserController();