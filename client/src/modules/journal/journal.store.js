'use strict';

import { browserHistory } from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import Store from './../../infrastructure/store';
import * as actions from './journal.actions';
import * as notifications from './../../infrastructure/notifications';
import DateGenerator from './../../infrastructure/date-generator';

export default class JournalStore extends Store {
    constructor() {
        super();

        this.students = [];
        this.schedules = [];
        this.registerDispatcherEvents();
        this.teacherId = "";
        this.subjectId = "";
        this.activities = [];
    }

    registerDispatcherEvents() {
        dispatcher.on('students.retrieve', this.onStudentsRetrieve.bind(this));
        dispatcher.on('students.retrieved', this.onStudentsRetrieved.bind(this));

        dispatcher.on('schedules.retrieve', this.onSchedulesRetrieve.bind(this));
        dispatcher.on('schedules.retrieved', this.onSchedulesRetrieved.bind(this));

        dispatcher.on('activity.save', this.onActivitySave.bind(this));
        dispatcher.on('activity.saved', this.onActivitySaved.bind(this));

        dispatcher.on('activities.retrieve', this.onActivitiesRetrieve.bind(this));
        dispatcher.on('activities.retrieved', this.onActivitiesRetrieved.bind(this));
        dispatcher.on('activities.clear', this.onClearActivities.bind(this));
    }

    onStudentsRetrieve(payload) {
        return actions.getStudents({groupId: payload.groupId});
    }

    onStudentsRetrieved(payload) {
        this.students = payload.data;
        this.trigger('changed');
    }

    onSchedulesRetrieve(payload) {
        this.teacherId = payload.teacherId;
        this.subjectId = payload.subjectId;
        return actions.getSchedules({
            groupId: payload.groupId,
            teacherId: payload.teacherId,
            subjectId: payload.subjectId
        });
    }

    onSchedulesRetrieved(payload) {
        this.schedules = payload.data;

        for(let i = 0; i < this.schedules.length; i++) {
            let time = this.schedules[i].time;
            let date = DateGenerator.getDate(this.schedules[i].day, new Date());
            const payload = {
                teacherId: this.teacherId,
                subjectId: this.subjectId,
                date: date,
                time: time
            };
            this.onActivitiesRetrieve(payload);
        }

        this.trigger('changed');
    }

    onActivitySave(payload) {
        return actions.saveActivity(payload.data);
    }

    onActivitySaved(payload) {
        this.trigger('changed');
    }

    onActivitiesRetrieve(payload) {
        return actions.getActivities({
            teacherId: payload.teacherId,
            date: payload.date,
            time: payload.time,
            subjectId: payload.subjectId
        });
    }

    onActivitiesRetrieved(payload) {
        this.activities.push(payload.data);
        this.trigger('changed');
    }

    onClearActivities() {
        this.activities = [];
        this.trigger('changed');
    }

    
}