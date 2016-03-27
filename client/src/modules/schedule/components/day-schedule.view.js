'use strict';

import React from 'react';
import * as actions from './../../schedule/schedule.actions';
import dispatcher from './../../../infrastructure/dispatcher';

export default class DaySchedule extends React.Component {
    constructor() {
        super();
        this.onValueChanged = this.onValueChanged.bind(this);
        this.state = this.getInitState();
    }

    getInitState() {
        return {
            showAddForm: false,
            schedule: []
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
            teacher: this.state.teacher,
            group: this.state.group,
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

        this.setState({day: props.day});
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.title || this.props.day.name}</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            {this.state.schedule ?
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Time</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Auditory</th>
                                    <th>{this.context.user.role === 'student' ? 'Teacher' : 'Group'}</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.schedule.map((s, i) => {
                                        return <tr key={s._id}>
                                            <td>{i + 1}</td>
                                            <td>{s.time}</td>
                                            <td>{s.title}</td>
                                            <td>{s.type}</td>
                                            <td>{s.auditory}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    })}
                                {this.state.showAddForm ?
                                <tr>
                                    <td colSpan="2">
                                        <input className="form-control" type="text" placeholder="Time" onChange={this.onValueChanged} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Title" onChange={this.onValueChanged} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Type" onChange={this.onValueChanged} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Auditory" onChange={this.onValueChanged} />
                                    </td>
                                    <td></td>
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
                                    Add new training activity
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