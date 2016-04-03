'use strict';

import React from 'react';
import DaySchedule from './day-schedule.view';
import scheduleDays from './../../../infrastructure/schedule-days';
import dispatcher from './../../../infrastructure/dispatcher';

export default class ScheduleFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            teachers: [],
            groups: []
        };
        this.renderTeachers = this.renderTeachers.bind(this);
        this.renderGroups = this.renderGroups.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.teachers) {
            this.setState({teachers: props.teachers});
        }

        if (props.groups) {
            this.setState({groups: props.groups});
        }
    }

    renderTeachers() {
        if (this.state.teachers) {
            return this.state.teachers.map(t => <option key={t._id} value={t._id}>{t.firstName} {t.lastName}</option>);
        }
    }

    renderGroups() {
        if (this.state.groups) {
            return this.state.groups.map(g => <option key={g._id} value={g._id}>{g.groupNumber}</option>);
        }
    }

    onTeacherSelectChanged(event) {
        const value = event.target.value;
        this.setState({groupFilterDisabled: !!value, teacher: value, group: ""});
    }

    onGroupSelectChanged(event) {
        const value = event.target.value;
        this.setState({teacherFilterDisabled: !!event.target.value, group: value, teacher: ""});
    }

    applyFilters() {
        dispatcher.dispatch({action: 'schedule.retrieve', data: {group: this.state.group, teacher: this.state.teacher}});
    }

    resetFilters() {
        this.setState({
            groupFilterDisabled: false,
            teacherFilterDisabled: false,
            group: "",
            teacher: ""
        });
    }

    render() {
        return (
            <div className="portlet">
                <div className="portlet-heading">
                    <h3 className="portlet-title text-dark text-uppercase">
                        Schedule Filter
                    </h3>
                    <div className="portlet-widgets">
                        <a onClick={this.resetFilters.bind(this)}>
                            <i className="ion-refresh"></i>
                        </a>
                        <span className="divider"></span>
                        <a data-toggle="collapse" data-parent="#accordion1" href="#portlet2">
                            <i className="ion-minus-round"></i>
                        </a>
                        <span className="divider"></span>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div id="portlet2" className="panel-collapse collapse in">
                    <div className="portlet-body">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Filter by teacher</label>
                            <div className="col-sm-10">
                                <select className="form-control"
                                        onChange={this.onTeacherSelectChanged.bind(this)}
                                        disabled={this.state.teacherFilterDisabled}
                                        value={this.state.teacher}>
                                    <option value="">Select teacher</option>
                                    {this.renderTeachers()}
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group m-t-15">
                            <label className="col-sm-2 control-label">Filter by group</label>
                            <div className="col-sm-10">
                                <select className="form-control"
                                        onChange={this.onGroupSelectChanged.bind(this)}
                                        disabled={this.state.groupFilterDisabled}
                                        value={this.state.group}>
                                    <option value="">Select group</option>
                                    {this.renderGroups()}
                                </select>
                            </div>
                        </div>
                        <button type="button"
                                className="btn btn-success btn-sm m-t-15 m-r-10 pull-right"
                                onClick={this.applyFilters.bind(this)} >
                            Apply filters
                        </button>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }
}