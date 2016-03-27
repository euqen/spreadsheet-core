'use strict';

import React from 'react';
import DaySchedule from './day-schedule.view';
import scheduleDays from './../../../infrastructure/schedule-days';

export default class WeekSchedule extends React.Component {
    constructor() {
        super();
        this.renderWeekSchedule = this.renderWeekSchedule.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({group: props.group, teacher: props.teacher});
    }

    renderWeekSchedule() {
        if (!this.context.user.permissions) {
            return <span>Loading....</span>;
        } else {
            return this.renderSchedule();
        }
    }

    renderSchedule() {
        /** If user is manager and no filter properties selected **/
        if (!this.context.user.permissions.canManageSchedule && !this.state.group && !this.state.teacher) {
            return (
                <div className="alert alert-warning">
                    Please select either teacher or group for filter
                </div>
            );
        }

        return scheduleDays.map(day =>
            <DaySchedule
                day={day}
                schedule={this.props.schedule.filter(s => s.day === day.value)}
                key={day.name}
            />)
    }

    render() {
        return <div>
            {this.renderWeekSchedule()}
        </div>;
    }
}

WeekSchedule.contextTypes = {
    user: React.PropTypes.object
};