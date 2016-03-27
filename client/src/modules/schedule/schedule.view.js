'use strict';

import React from 'react';
import ErrorCollector from './../../components/error-collector';
import WeekSchedule from './components/week-schedule.view';
import store from './schedule.store';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';

function getState() {
    return {
        schedule: store.schedule
    }
}

@bind(store, getState)
export default class Schedule extends React.Component {
    constructor() {
        super();
        this.state = getState();
    }

    componentDidMount() {
        dispatcher.dispatch({action: 'schedule.retrieve'});
    }

    render() {
        return (
            <div>
                <ErrorCollector />
                <WeekSchedule
                    schedule={this.props.schedule}
                />
            </div>
        );
    }
}