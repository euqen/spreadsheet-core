import validator from './../../../utils/validator';

export default function(req, res) {
    return validator.validate((errors) => {
        let email = req.body.email;
        let password = req.body.password;

        if (!email) {
            errors.collect('email', 'Please specify email');
        }

        if (!password) {
            errors.collect('password', 'Please specify password');
        }

        return {email, password};

    }, req, res);
}