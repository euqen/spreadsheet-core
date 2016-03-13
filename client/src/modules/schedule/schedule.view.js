import React from 'react';
import ErrorCollector from './../../components/error-collector';
import WeekSchedule from './../dashboard/components/week-schedule.view';
import userActions from './../users/users.actions';
import actions from './schedule.actions';

export default class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        return this.getSchedule()
            .then(() => this.getTeachers());
    }

    getTeachers() {
        return userActions.getTeachers()
            .then(teachers => {
                this.setState({teachers: teachers});
            });
    }

    getSchedule() {
        return actions.getSchedule()
            .then(schedule => {
                this.setState({schedule: schedule});
            })
    }

    render() {
        return (
            <div>
                <ErrorCollector />
                <WeekSchedule
                    teachers={this.state.teachers}
                    schedule={this.state.schedule}
                />
            </div>
        );
    }
}