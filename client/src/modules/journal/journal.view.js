'use strict';

import React from 'react';
import {Link} from 'react-router';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';
import ErrorCollector from './../../components/error-collector';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import store from './journal.store';
import moment from 'moment';

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
        schedules: props.schedules
    }
}

const days = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6
};

@bind(store, getState)
export default class Journal extends React.Component {
    constructor() {
        super();
        this.state =
        {
            students: {},
            schedules: {},
            currentDay: new Date()
        };
        // this.state = this.getInitState();
    }

    componentDidMount() {
        var { groupId, teacherId, subjectId } = this.props.location.query;
        dispatcher.dispatch({action: 'students.retrieve', groupId: groupId});
        dispatcher.dispatch({action: 'schedules.retrieve', groupId: groupId, teacherId: teacherId, subjectId: subjectId});
    }

    componentWillReceiveProps(props) {
        if (props.students) {
            this.state.students = props.students;
        }
        if (props.schedules) {
            this.state.schedules = props.schedules;
        }
    }

    getStudentFullname (student) {
        return student.lastName + " " + student.firstName + " " + student.middleName;
    }

    getDate(day, date) {
        let mondayDate = this.getMonday(date);
        let resultDate = new Date(mondayDate.valueOf() + days[day] * 86400000);
        return moment(resultDate).format("DD/MM/YYYY");
    }

    getMonday(d) {
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    shiftLeft() {
        let newCurrentDay = new Date(this.state.currentDay.valueOf() - 7 * 86400000);
        this.setState({currentDay: newCurrentDay});
    }

    shiftRight() {
        let now = new Date();
        if(now.valueOf() >= this.state.currentDay.valueOf() + 7 * 86400000) {
            let newCurrentDay = new Date(this.state.currentDay.valueOf() + 7 * 86400000);
            this.setState({currentDay: newCurrentDay});
        }
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
                                                <th key={schedule._id}>{this.getDate(schedule.day, this.state.currentDay)} {schedule.time}</th>
                                                ) : null
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.students ?
                                            this.props.students.map((student, index) =>
                                            <tr key={student._id}>
                                                <th>{index + 1}</th>
                                                <th>{this.getStudentFullname(student)}</th>
                                                {
                                                    this.props.schedules ?
                                                    this.props.schedules.map((schedule, index) =>
                                                    <th>
                                                        <input key={schedule._id + student._id} className="form-control"
                                                               type="text"
                                                               onChange={this.onValueChanged}
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
