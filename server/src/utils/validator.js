export default function validate (validator, req, res) {
    let errors = new Errors();

    return Promise.resolve(validator(errors))
        .then((data) => {
            if (errors.hasErrors()) {
                res.status(400).send(errors.retrieve());
            }

            return {
                isValid: !errors.hasErrors(),
                result: data
            }
        });
}

class Errors {
    constructor() {
        this._errors = {};
        this._hasErrors = false;
    }

    collect(field, error) {
        if (!this._errors[field]) {
            this._errors[field] = error;
            this._hasErrors = true;
        }
    }

    retrieve() {
        let errors = [];

        for (let field in this._errors) {
            errors.push({field: field, error: this._errors[field]});
        }

        return errors;
    }

    hasErrors() {
        return this._hasErrors;
    }
}