import validator from './validators/group.create.validator';
import service from './group.service';

export function create(req, res) {
    return validator(req, res)
        .then(data => {
            if (!data.isValid) {
                return;
            }
            return service.create(data.result);
        });
}

export function list(req, res) {
    const query = {
        isRemoved: false
    };

    return service.find(query);
}

export function getById(req, res) {
    return service.findOne({_id: req.params.id});
}

export function update(req, res) {
    return validator(req, res)
        .then(data => {
            if (!data.isValid) {
                return;
            }

            return service.updateOne({_id: req.params.id}, doc => {
                Object.assign(doc, data.result);
            });
        });
}

export function remove(req, res) {
    return service.updateOne({_id: req.params.id}, doc => {
        doc.isRemoved = true;
    });
}