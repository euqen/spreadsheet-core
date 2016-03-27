'use strict';

import React from 'react';
import ErrorCollector from './../../components/error-collector';
import WeekSchedule from './components/week-schedule.view';
import store from './schedule.store';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';
import ScheduleFilter from './components/schedule.filter.view';

function getState() {
    return {
        schedule: store.schedule,
        teachers: store.teachers,
        groups: store.groups,
        group: store.group,
        teacher: store.teacher
    }
}

@bind(store, getState)
export default class Schedule extends React.Component {
    constructor() {
        super();
        this.state = getState();
    }

    componentDidMount() {
        dispatcher.dispatch({action: 'schedule.retrieve', data: {}});
        dispatcher.dispatch({action: 'teachers.retrieve'});
    }

    render() {
        return (
            <div>
                <ErrorCollector />
                <ScheduleFilter
                    teachers={this.props.teachers}
                    groups={this.props.groups}
                />
                <WeekSchedule
                    schedule={this.props.schedule}
                    teacher={this.props.teacher}
                    group={this.props.group}
                />
            </div>
        );
    }
}