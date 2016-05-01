'use strict';

import React from 'react';
import {Link} from 'react-router';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';
import ErrorCollector from './../../components/error-collector';
import store from './profile.store';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import LocalizationService from './../../infrastructure/localization-service';

counterpart.registerTranslations('en', {
    infoAboutMe: "Information about current user",
    email: "Email",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    studentsGroup: "Student's group",
    create: "Create"
});

counterpart.registerTranslations('ru', {
    infoAboutMe: "Информация о текущем пользователе",
    email: "Email",
    firstName: "Имя",
    middleName: "Отчество",
    lastName: "Фамилия",
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
        lastName: "Фамилия"
    }
};

function getState(props) {
    return {
        user: props.user
    }
}

@bind(store, getState)
export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getInitState();
        this.state.localizationService = new LocalizationService(additionalConstants);
    }

    getInitState() {
        return {
            showEditForm: false,
            user: {}
        };
    }

    toggleAddForm() {
        this.setState({showEditForm: !this.state.showEditForm});
    }

    onValueChanged(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillReceiveProps(props) {
        if(props.user) {
            Object.assign(this.state, props.user);
        }
    }

    updateUser() {
        const data = {
            email: this.state.email,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName
        };

        if(!this.props.user.group) {
            data.group = this.state.group;
        }

        dispatcher.dispatch({action: 'user.update', userId: this.props.user._id, user: data});

        this.setState({showEditForm: !this.state.showEditForm});
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <Translate content="infoAboutMe" />&nbsp;
                            {!this.state.showEditForm ?
                                <button className="btn btn-xs btn-primary pull-right" onClick={this.toggleAddForm.bind(this)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                :
                                <button className="btn btn-xs btn-success pull-right" onClick={this.updateUser.bind(this)}>
                                    <i className="fa fa-save"></i>
                                </button>
                            }
                        </h3>
                    </div>
                    <div className="panel-body">
                        <ErrorCollector />
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="table-responsive">
                                    <div className="form-group">
                                            <label><Translate content="email" />:</label>
                                            <p>{this.props.user.email}</p>
                                    </div>
                                    <div className="form-group">
                                        <label><Translate content="firstName" />: &nbsp;</label>
                                            {!this.state.showEditForm ?
                                                <p>{this.props.user.firstName}</p>
                                                :
                                                <input type="text"
                                                       className="form-control"
                                                       id="firstname"
                                                       defaultValue={this.props.user.firstName}
                                                       placeholder={this.state.localizationService.translate("firstName")}
                                                       name="firstName"
                                                       onChange={this.onValueChanged.bind(this)}/>
                                            }
                                    </div>
                                    <div className="form-group">
                                            <label><Translate content="middleName" />: &nbsp;</label>
                                            {!this.state.showEditForm ?
                                                <p>{this.props.user.middleName}</p>
                                                :
                                                <input type="text"
                                                       className="form-control"
                                                       id="middlename"
                                                       defaultValue={this.props.user.middleName}
                                                       placeholder={this.state.localizationService.translate("middleName")}
                                                       name="middleName"
                                                       onChange={this.onValueChanged.bind(this)}/>
                                            }
                                    </div>
                                    <div className="form-group">
                                            <label><Translate content="lastName" />: &nbsp;</label>
                                            {!this.state.showEditForm ?
                                                <p>{this.props.user.lastName}</p>
                                                :
                                                <input type="text"
                                                       className="form-control"
                                                       id="lastname"
                                                       defaultValue={this.props.user.lastName}
                                                       placeholder={this.state.localizationService.translate("lastName")}
                                                       name="lastName"
                                                       onChange={this.onValueChanged.bind(this)}/>
                                            }
                                    </div>
                                    <div className="form-group">
                                        {this.props.user.group ?
                                            <div>
                                                <label><Translate content="studentsGroup" />: &nbsp;</label>
                                                <p>{this.props.user.group}</p>
                                            </div>
                                            : this.props.user.group
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
