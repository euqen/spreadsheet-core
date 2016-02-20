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
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Authorization</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input type="email" className="form-control" id="email"
                                           placeholder="Enter email" onChange={this.onEmailChange.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Password</label>
                                    <input type="password" className="form-control" id="password"
                                           placeholder="Password" onChange={this.onPasswordChange.bind(this)}/>
                                </div>
                                <a className="btn btn-purple float-right" onClick={this.logIn.bind(this)}>Login</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}