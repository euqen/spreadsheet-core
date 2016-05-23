'use strict';

import React from 'react';
import ErrorCollector from './../../components/error-collector';
import WeekSchedule from './components/week-schedule.view';
import store from './schedule.store';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';
import ScheduleFilter from './components/schedule.filter.view';

function getState(props) {
    return {
        schedule: props.schedule,
        teachers: props.teachers,
        subjects: props.subjects,
        groups: props.groups,
        group: props.group,
        teacher: props.teacher
    }
}

@bind(store, getState)
export default class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            schedule: [],
            teachers: [],
            groups: [],
            subjects: [],
            group: {},
            teacher: {}
        }
    }

    componentDidMount() {
        dispatcher.dispatch({action: 'schedule.retrieve', data: {}});
        dispatcher.dispatch({action: 'teachers.retrieve'});
        dispatcher.dispatch({action: 'groups.retrieve'});
        dispatcher.dispatch({action: 'subjects.retrieve'});
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
                    teachers={this.props.teachers}
                    subjects={this.props.subjects}
                    group={this.props.group}
                    groups={this.props.groups}
                />
            </div>
        );
    }
}