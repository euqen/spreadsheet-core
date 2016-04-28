'use strict';

import React from 'react';
import {Link} from 'react-router';
import ErrorCollector from './../../components/error-collector';
import dispatcher from './../../infrastructure/dispatcher';
import bind from './../../infrastructure/store-connector';
import store from './registration.store';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    registerNewPerson: "Register new person",
    email: "Email",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    roles: "Roles",
    roleTypes: {
        manager: "Manager",
        teacher: "Teacher",
        student: "Student"
    },
    studentsGroup: "Student's group",
    create: "Create"
});

counterpart.registerTranslations('ru', {
    registerNewPerson: "Зарегистрировать нового человека",
    email: "Email",
    firstName: "Имя",
    middleName: "Отчество",
    lastName: "Фамилия",
    roles: "Роль",
    roleTypes: {
        manager: "Админ",
        teacher: "Преподаватель",
        student: "Студент"
    },
    studentsGroup: "Группа студента",
    create: "Создать"
});

const additionalConstants = {
    en: {
        enterEmail: "Enter email",
        firstName: "First Name",
        middleName: "Middle Name",
        lastName: "Last Name"
    },
    ru: {
        enterEmail: "Введите email",
        firstName: "Имя",
        middleName: "Отчество",
        lastName: "Фамилия",
    }
};

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
                        <h3 className="panel-title"><Translate content="registerNewPerson" /></h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <form role="form">
                                    <div className="form-group">
                                        <label htmlFor="email"><Translate content="email" /></label>
                                        <input type="email"
                                               className="form-control"
                                               id="email"
                                               placeholder={additionalConstants[counterpart.getLocale()].enterEmail}
                                               name="email"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firstname">
                                            <Translate content="firstName" /></label>
                                        <input type="text"
                                               className="form-control"
                                               id="firstname"
                                               placeholder={additionalConstants[counterpart.getLocale()].firstName}
                                               name="firstName"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="middlename">
                                            <Translate content="middleName" /></label>
                                        <input type="text"
                                               className="form-control"
                                               id="middlename"
                                               placeholder={additionalConstants[counterpart.getLocale()].middleName}
                                               name="middleName"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">
                                            <Translate content="lastName" />
                                        </label>
                                        <input type="text"
                                               className="form-control"
                                               id="lastname"
                                               placeholder={additionalConstants[counterpart.getLocale()].lastName}
                                               name="lastName"
                                               onChange={this.onValueChanged} />
                                    </div>
                                    <div className="form-group">
                                        <label><Translate content="roles" /></label>
                                        <div className="radio">
                                            <label className="cr-styled" forHtml="manager">
                                                <input type="radio"
                                                       id="manager"
                                                       name="permissions"
                                                       value="manager"
                                                       name="role"
                                                       onChange={this.onValueChanged} />
                                                <i className="fa"></i>
                                                <span><Translate content="roleTypes.manager" /></span>
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
                                                <span><Translate content="roleTypes.teacher" /></span>
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
                                                <span><Translate content="roleTypes.student" /></span>
                                            </label>
                                        </div>
                                    </div>
                                    {this.state.role === 'student' ?
                                        <div className="form-group">
                                            <label htmlFor="role">
                                                <Translate content="studentsGroup" />
                                            </label>
                                            <input type="text"
                                                   className="form-control"
                                                   id="group"
                                                   placeholder="Student's group"
                                                   name="group"
                                                   onChange={this.onValueChanged} />
                                        </div>
                                        : null }
                                    <button onClick={this.create} type="button" className="btn btn-success pull-right"><Translate content="create" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}