'use strict';

import React from 'react';
import {Link} from 'react-router';
import store from './log-in.store';
import ErrorCollector from './../../components/error-collector';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';

function getState() {
    return {
        data: store.data
    }
}

@bind(store, getState)
export default class SignIn extends React.Component {
    constructor() {
        super();
        this.state = getState();
    }

    logIn() {
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        dispatcher.dispatch({action: 'user.log-in', data: data})
    }

    onValueChanged(event) {
        this.setState({[event.target.name]: event.target.value});
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
                                    <input type="email" className="form-control" id="email" name="email"
                                           placeholder="Enter email" onChange={this.onValueChanged.bind(this)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">
                                        Password</label>
                                    <input type="password" className="form-control" id="password" name="password"
                                           placeholder="Password" onChange={this.onValueChanged.bind(this)}/>
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