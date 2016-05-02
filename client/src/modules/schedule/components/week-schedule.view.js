'use strict';

import React from 'react';
import DaySchedule from './day-schedule.view';
import scheduleDays from './../../../infrastructure/schedule-days';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    alertMessage: "Please, select either teacher or group for filter"
});

counterpart.registerTranslations('ru', {
    alertMessage: "Пожалуйста, выберите преподавателя или группу для фильтра"
});

export default class WeekSchedule extends React.Component {
    constructor() {
        super();

        this.state = {};
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
                    <Translate content="alertMessage" />
                </div>
            );
        }
        return scheduleDays.map(day =>
            <DaySchedule
                day={day}
                schedule={this.props.schedule.filter(s => s.day === day.value)}
                group={this.state.group}
                groups={this.props.groups}
                teacher={this.state.teacher}
                teachers={this.props.teachers}
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