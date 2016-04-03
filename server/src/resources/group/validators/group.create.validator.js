import validate from './../../../utils/validator';
import validator from 'validator';
import roles from './../../../internal/roles';

export default function (req, res) {
    return validate((errors) => {
        const groupNumber = req.body.groupNumber;

        if (!groupNumber) {
            errors.collect('groupNumber', 'Please specify group number');
        } else if (!validator.isLength(groupNumber, {min: 3, max: 10})) {
            errors.collect('groupNumber', 'Please specify group number between 3 and 10 digits');
        }

        return {
            groupNumber: groupNumber,
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