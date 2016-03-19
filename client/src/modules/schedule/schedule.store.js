'use strict';

import {browserHistory} from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as userActions from './../users/users.actions';
import * as scheduleActions from './schedule.actions';

class ScheduleStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('schedule.create', this.onScheduleCreate.bind(this));
        dispatcher.on('schedule.retrieve', this.onScheduleRetrieve.bind(this));
        dispatcher.on('schedule.retrieved', this.onScheduleRetrieved.bind(this));
    }

    setDefaults() {
        this._schedule = [];
    }

    get schedule() {
        return this._schedule;
    }

    onScheduleRetrieved(payload) {
        this._schedule = payload.data;
        this.trigger('changed');
    }

    onScheduleRetrieve(payload) {
        return scheduleActions.getSchedule(payload);
    }

    onScheduleCreate(payload) {
        return scheduleActions.save(payload.data);
    }

    onScheduleCreated(payload) {
        this._schedule.push(payload.data);
        this.trigger('changed');
    }
}

export default new ScheduleStore();