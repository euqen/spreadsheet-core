'use strict';

import React from 'react';
import * as actions from './../../schedule/schedule.actions';
import dispatcher from './../../../infrastructure/dispatcher';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import LocalizationService from './../../../infrastructure/localization-service';
import TimePicker from './../../../components/timepicker';
import activityTypes from './../../../infrastructure/activity-types';

counterpart.registerTranslations('en', {
    time: "Time",
    title: "Title",
    type: "Type",
    auditory: "Auditory",
    teacher: "Teacher",
    group: "Group",
    actions: "Actions",
    addNewTrainingActivity: "Add new training activity",
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Sunday: "Sunday",
    Saturday: "Saturday"
});

counterpart.registerTranslations('ru', {
    time: "Время",
    title: "Заголовок",
    type: "Тип",
    auditory: "Аудитория",
    teacher: "Преподаватель",
    group: "Группа",
    actions: "Действия",
    addNewTrainingActivity: "Добавить новое учебное занятие",
    Monday: "Понедельник",
    Tuesday: "Вторник",
    Wednesday: "Среда",
    Thursday: "Четверг",
    Friday: "Пятница",
    Sunday: "Суббота",
    Saturday: "Воскресение"
});

const additionalConstants = {
    en: {
        time: "Time",
        title: "Title",
        type: "Type",
        auditory: "Auditory"
    },
    ru: {
        time: "Время",
        title: "Заголовок",
        type: "Тип",
        auditory: "Аудитория"
    }
};

export default class DaySchedule extends React.Component {
    constructor() {
        super();

        this.state = this.getInitState();
        this.onValueChanged = this.onValueChanged.bind(this);
        this.state.localizationService = new LocalizationService(additionalConstants);
    }

    getInitState() {
        return {
            showAddForm: false,
            schedule: [],
            teacher: '',
            group: ''
        };
    }

    toggleAddForm() {
        this.setState({showAddForm: !this.state.showAddForm});
    }

    onValueChanged(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    save() {
        const model = {
            day: this.props.day.value,
            time: this.state.time,
            teacher: this.state.teacher || this.props.teacher,
            group: this.state.group || this.props.group,
            title: this.state.title,
            type: this.state.type,
            auditory: this.state.auditory
        };

        dispatcher.dispatch({action: 'schedule.create', data: model});
    }

    componentWillReceiveProps(props) {
        if (props.schedule) {
            this.setState({schedule: props.schedule});
        }

        this.setState({showAddForm: props.showAddForm, day: props.day});
    }

    renderTeachers() {
        if (this.props.teachers) {
            return (
                <select onChange={this.onValueChanged.bind(this)} name="teacher" className="form-control">
                    <option value="">Select teacher</option>
                    {this.props.teachers.map(t =>
                        <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>)}
                </select>
            );
        }
    }

    renderGroups() {
        if (this.props.groups) {
            return (
                <select onChange={this.onValueChanged.bind(this)} name="group" className="form-control">
                    <option value="">Select group</option>
                    {this.props.groups.map(g =>
                        <option key={g._id} value={g._id}>{g.groupNumber}</option>)}
                </select>
            );
        }
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.title || <Translate content={this.props.day.name} />}</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            {this.state.schedule ?
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th><Translate content="time" /></th>
                                    <th><Translate content="title" /></th>
                                    <th><Translate content="type" /></th>
                                    <th><Translate content="auditory" /></th>
                                    <th>{this.props.group ?
                                        <Translate content="teacher" /> : <Translate content="group" />}</th>
                                    <th><Translate content="actions" /></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.schedule.map((s, i) => {
                                        return <tr key={s._id}>
                                            <td>{i + 1}</td>
                                            <td>{s.time}</td>
                                            <td>{s.title}</td>
                                            <td>{s.type}</td>
                                            <td>{s.auditory}</td>
                                            <td>{this.props.group ? s.teacher.fullName : s.group.number}</td>
                                            <td></td>
                                        </tr>
                                    })}
                                {this.state.showAddForm ?
                                <tr>
                                    <td colSpan="2">
                                        <TimePicker onChange={this.onValueChanged} />
                                    </td>
                                    <td>
                                        <input className="form-control"
                                               type="text"
                                               placeholder={this.state.localizationService.translate("title")}
                                               onChange={this.onValueChanged}
                                               name="title" />
                                    </td>
                                    <td>
                                        <select name="type" className="form-control" onChange={this.onValueChanged}>
                                            <option value="">Select type...</option>
                                            {activityTypes.map(t =>
                                                <option value={t.value} key={t.value}>{t.name}</option>
                                            )}
                                        </select>
                                    </td>
                                    <td>
                                        <input className="form-control"
                                               type="text"
                                               placeholder={this.state.localizationService.translate("auditory")}
                                               onChange={this.onValueChanged}
                                               name="auditory" />
                                    </td>
                                    <td>{this.props.group ? this.renderTeachers() : this.renderGroups()}</td>
                                    <td>
                                        <button className="btn btn-xs btn-primary" onClick={this.save.bind(this)}>
                                            <i className="ion-checkmark-round"></i>
                                        </button>
                                        <button className="btn btn-xs btn-primary" onClick={this.toggleAddForm.bind(this)}>
                                            <i className="ion-close"></i>
                                        </button>
                                    </td>
                                </tr> : null }
                                </tbody>
                            </table> : null}
                            {!this.state.showAddForm && !this.props.hideAddForm ?
                                <button className="btn btn-sm btn-block btn-default" onClick={this.toggleAddForm.bind(this)}>
                                    <Translate content="addNewTrainingActivity" />
                                </button> : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DaySchedule.contextTypes = {
    user: React.PropTypes.object
};