import React from 'react';
import dispatcher from './../infrastructure/dispatcher';

export default class ErrorCollector extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: []
        };

        dispatcher.on('api:validation', this.onValidationError.bind(this));
        dispatcher.on('api:error', this.onValidationError.bind(this));
        dispatcher.on('api:response', this.onResponse.bind(this));
    }

    onValidationError(payload) {
        const errors = payload.res;
        this.setState({errors: errors});
    }

    onResponse() {
        this.setState({errors: []});
    }

    render() {
        let errors = [];

        for (let err of this.state.errors) {
            errors.push(<Error error={err.error} key={err.field} />);
        }

        return (
            <div>
                {errors.length !== 0 ?
                    <div className="alert alert-danger">
                        {errors}
                    </div>
                : null}
            </div>
        );
    }
}

class Error extends React.Component {
    render() {
        return (
            <div>
                {this.props.error}
            </div>
        );
    }
}