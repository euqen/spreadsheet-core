import validate from './../../../utils/validator';
import validator from 'validator';

export default function (req, res) {
    return validate((errors) => {
        const name = req.body.name;

        if (!name) {
            errors.collect('name', 'Please specify name');
        } else if (!validator.isLength(name, {min: 1, max: 30})) {
            errors.collect('name', 'Please specify name between 1 and 30 symbols');
        }

        return {
            name: name,
            createdOn: new Date(),
            createdBy: {
                _id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName
            },
            isRemoved: false
        }

    }, req, res);
}