'use strict';

import React from 'react';
import {Link} from 'react-router';
import logInActions from './log-in.actions';
import logInStore from './log-in.store';
import ErrorCollector from './../../components/error-collector';

export default class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: null,
            password: null
        };
    }

    logIn() {
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        return logInActions.logIn(data);
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-4 middle">
                    <ErrorCollector />
                    <div className="well">
                        <h3 text-align="center"><strong>Authorization</strong></h3>
                        <div className="form-group has-success">
                            <label className="control-label" forHtml="email">E-Mail</label>
                            <input type="text" className="form-control" onChange={this.onEmailChange.bind(this)} id="email" placeholder="example@site.com"/>
                        </div>
                        <div className="form-group has-success m-t-10">
                            <label className="control-label" forHtml="password">Password</label>
                            <input type="password" className="form-control" onChange={this.onPasswordChange.bind(this)} id="password" placeholder="Your password"/>
                        </div>
                        <Link to="/reset">Reset password</Link>
                        <button className="btn btn-raised btn-success btn-sm pull-right" onClick={this.logIn.bind(this)}>login</button>
                    </div>
                </div>
            </div>
        );
    }
}