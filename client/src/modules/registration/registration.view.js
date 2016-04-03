'use strict';

import React from 'react';
import {Link} from 'react-router';
import ErrorCollector from './../../components/error-collector';
import dispatcher from './../../infrastructure/dispatcher';
import bind from './../../infrastructure/store-connector';
import store from './registration.store';

function getState(props) {
    return {
        user: props.user
    }
}

@bind(store, getState)
export default class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };

        this.onValueChanged = this.onValueChanged.bind(this);
        this.create = this.create.bind(this);
    }

    onValueChanged(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    create() {
        const data = {
            email: this.state.email,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            role: this.state.role,
            group: this.state.group
        };

        dispatcher.dispatch({action: 'user.create', user: data})
    }

    render() {
        return (
            <div>
                <ErrorCollector />
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Register new person</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <form role="form">
                                    <div className="form-group">
                                        <label htmlFor="emial">Email</label>
                                        <input type="email"
                                               className="form-control"
                                               id="email"
                                               placeholder="Enter email"
                                               name="email"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstname">
                                            First Name</label>
                                        <input type="text"
                                               className="form-control"
                                               id="firstname"
                                               placeholder="Fist Name"
                                               name="firstName"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="middlename">
                                            Middle Name</label>
                                        <input type="text"
                                               className="form-control"
                                               id="middlename"
                                               placeholder="Middle Name"
                                               name="middleName"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">
                                            Last Name
                                        </label>
                                        <input type="text"
                                               className="form-control"
                                               id="lastname"
                                               placeholder="Last Name"
                                               name="lastName"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label>Roles</label>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="manager">
                                                <input type="radio"
                                                       id="manager"
                                                       name="permissions"
                                                       value="manager"
                                                       name="role"
                                                       onChange={this.onValueChanged} />
                                                <i className="fa"></i>
                                                <span>Manager</span>
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="teacher">
                                                <input type="radio"
                                                       id="teacher"
                                                       name="permissions"
                                                       value="teacher"
                                                       name="role"
                                                       onChange={this.onValueChanged} />
                                                <i className="fa"></i>
                                                <span>Teacher</span>
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="student">
                                                <input type="radio"
                                                       id="student"
                                                       name="permissions"
                                                       value="student"
                                                       name="role"
                                                       onChange={this.onValueChanged} />
                                                <i className="fa"></i>
                                                <span>Student</span>
                                            </label>
                                        </div>
                                    </div>
                                    {this.state.role === 'student' ?
                                        <div className="form-group">
                                            <label htmlFor="role">
                                                Student's group
                                            </label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="group"
                                                   placeholder="Student's group"
                                                   name="group"
                                                   onChange={this.onValueChanged} />
                                        </div>
                                        : null }
                                    <button onClick={this.create} type="button" className="btn btn-success pull-right">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}