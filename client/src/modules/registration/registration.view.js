'use strict';

import React from 'react';
import {Link} from 'react-router';
import ErrorCollector from './../../components/error-collector';
import actions from './registration.actions';
import store from './registration.store';

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            role: 'student'
        };
    }

    onFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    onLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    onMiddleNameChange(event) {
        this.setState({middleName: event.target.value});
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onRolesChanged(event) {
        this.setState({role: event.target.value});
    }

    onGroupChange(event) {
        this.setState({group: event.target.value});
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

        return actions.register(data);
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
                                        <label htmlFor="exampleInputEmail1">Email</label>
                                        <input type="email" className="form-control" id="email"
                                               placeholder="Enter email" onChange={this.onEmailChange.bind(this)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstname">
                                            First Name</label>
                                        <input type="text" className="form-control" id="firstname"
                                               placeholder="Fist Name" onChange={this.onFirstNameChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="middlename">
                                            Middle Name</label>
                                        <input type="text" className="form-control" id="middlename"
                                               placeholder="Middle Name" onChange={this.onMiddleNameChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">
                                            Last Name
                                        </label>
                                        <input type="text" className="form-control" id="lastname"
                                               placeholder="Last Name" onChange={this.onLastNameChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Roles</label>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="manager">
                                                <input type="radio" id="manager" name="permissions" value="manager"
                                                       onChange={this.onRolesChanged.bind(this)}/>
                                                <i className="fa"></i>
                                                <span>Manager</span>
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="teacher">
                                                <input type="radio" id="teacher" name="permissions" value="teacher"
                                                       onChange={this.onRolesChanged.bind(this)}/>
                                                <i className="fa"></i>
                                                <span>Teacher</span>
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="student">
                                                <input type="radio" id="student" name="permissions" value="student"
                                                       onChange={this.onRolesChanged.bind(this)}/>
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
                                            <input type="text" className="form-control" id="group"
                                                   placeholder="Student's group" onChange={this.onGroupChange.bind(this)}/>
                                        </div>
                                        : null }
                                    <button onClick={this.create.bind(this)} type="button" className="btn btn-success pull-right">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}