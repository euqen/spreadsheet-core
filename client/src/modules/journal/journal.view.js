'use strict';

import React from 'react';
import {Link} from 'react-router';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';
import ErrorCollector from './../../components/error-collector';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import store from './journal.store';
import DateGenerator from './../../infrastructure/date-generator';

counterpart.registerTranslations('en', {
    journal: "Journal"
});

counterpart.registerTranslations('ru', {
    journal: "Журнал"
});

function getState(props) {
    return {
        user: props.user,
        students: props.students,
        schedules: props.schedules,
        activities: props.activities
    }
}

@bind(store, getState)
export default class Journal extends React.Component {
    constructor() {
        super();
        this.state =
        {
            students: {},
            schedules: {},
            currentDay: new Date(),
            activities: []
        };

    }

    componentDidMount() {
        var { groupId, teacherId, subjectId } = this.props.location.query;
        dispatcher.dispatch({action: 'students.retrieve', groupId: groupId});
        dispatcher.dispatch({action: 'schedules.retrieve', groupId: groupId, teacherId: teacherId, subjectId: subjectId});
    }

    componentWillReceiveProps(props) {
        if (props.students) {
            this.setState({students: props.students});
        }
        if (props.schedules) {
            this.setState({schedules: props.schedules});
        }
        if (props.activities) {
            this.setState({activities: props.activities});
        }
    }

    getStudentFullname (student) {
        return student.lastName + " " + student.firstName + " " + student.middleName;
    }

    getActivities() {
        var { groupId, teacherId, subjectId } = this.props.location.query;

        for(let i = 0; i < this.props.schedules.length; i++) {
            let time = this.props.schedules[i].time;
            let date = DateGenerator.getDate(this.props.schedules[i].day, this.state.currentDay);
            const payload = {
                teacherId: teacherId,
                subjectId: subjectId,
                date: date,
                time: time
            };

            dispatcher.dispatch({action: 'activities.retrieve', teacherId: payload.teacherId, date: payload.date, time: payload.time, subjectId: payload.subjectId});
        }
    }

    shiftLeft() {
        dispatcher.dispatch({action: 'activities.clear'});
        let newCurrentDay = new Date(this.state.currentDay.valueOf() - 7 * 86400000);
        this.state.currentDay = newCurrentDay;
        this.getActivities();
    }

    shiftRight() {
        let now = new Date();
        if(now.valueOf() >= this.state.currentDay.valueOf() + 7 * 86400000) {
            dispatcher.dispatch({action: 'activities.clear'});
            let newCurrentDay = new Date(this.state.currentDay.valueOf() + 7 * 86400000);
            this.state.currentDay = newCurrentDay;
            this.getActivities();
        }
    }

    onValueChanged(date, time, studentId, studentIndex, scheduleIndex, event) {
        var { groupId, teacherId, subjectId } = this.props.location.query;
        const data = {
            studentId: studentId,
            createdOn: new Date(),
            teacherId: teacherId,
            date: date,
            time: time,
            subjectId: subjectId,
            value: event.target.value,
            presence: true
        };
        dispatcher.dispatch({action: 'activity.save', data: data});
        if(!this.state.activities) this.state.activities = [];
        if(!this.state.activities[scheduleIndex]) this.state.activities[scheduleIndex] = [];

        if(!this.state.activities[scheduleIndex][studentIndex])
            this.state.activities[scheduleIndex][studentIndex] = data;

        this.state.activities[scheduleIndex][studentIndex].value = event.target.value;

    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <Translate content="journal" />
                            <button className="btn btn-xs btn-primary pull-right" onClick={this.shiftRight.bind(this)}>
                                <i className="ion-arrow-right-a"></i>
                            </button>
                            <button className="btn btn-xs btn-primary pull-right" onClick={this.shiftLeft.bind(this)}>
                                <i className="ion-arrow-left-a"></i>
                            </button>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <ErrorCollector />
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Student name</th>
                                            {
                                                this.props.schedules ?
                                                this.props.schedules.map((schedule, index) =>
                                                <th key={schedule._id}>{DateGenerator.getDate(schedule.day, this.state.currentDay)} {schedule.time}</th>
                                                ) : null
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.students ?
                                            this.props.students.map((student, studentIndex) =>
                                            <tr key={student._id}>
                                                <th>{studentIndex + 1}</th>
                                                <th>{this.getStudentFullname(student)}</th>
                                                {
                                                    this.props.schedules ?
                                                    this.props.schedules.map((schedule, scheduleIndex) =>
                                                    <th key={schedule._id}>
                                                        <input key={schedule._id + student._id} className="form-control"
                                                               type="text"
                                                               data-student-id={student._id}
                                                               data-schedule-id={schedule._id}
                                                               value={this.state.activities[scheduleIndex] ? this.state.activities[scheduleIndex].find(e => e.studentId === student._id) ? this.state.activities[scheduleIndex].find(e => e.studentId === student._id).value : '' : ''}
                                                               onChange={this.onValueChanged.bind(this, DateGenerator.getDate(schedule.day, this.state.currentDay), schedule.time, student._id, studentIndex, scheduleIndex)}
                                                               name="assessment" />
                                                    </th>
                                                    ) : null
                                                }
                                            </tr>
                                            ) : null
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
