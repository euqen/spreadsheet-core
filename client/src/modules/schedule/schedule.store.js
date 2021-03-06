'use strict';

import {browserHistory} from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as userActions from './../users/users.actions';
import * as groupActions from './../groups/groups.actions';
import * as scheduleActions from './schedule.actions';
import * as subjectActions from './../subjects/subjects.actions';

export default class ScheduleStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('schedule.create', this.onScheduleCreate.bind(this));
        dispatcher.on('schedule.created', this.onScheduleCreated.bind(this));

        dispatcher.on('schedule.retrieve', this.onScheduleRetrieve.bind(this));
        dispatcher.on('schedule.retrieved', this.onScheduleRetrieved.bind(this));

        dispatcher.on('teachers.retrieve', this.onTeachersRetrieve.bind(this));
        dispatcher.on('teachers.retrieved', this.onTeachersRetrieved.bind(this));

        dispatcher.on('groups.retrieve', this.onGroupsRetrieve.bind(this));
        dispatcher.on('groups.retrieved', this.onGroupsRetrieved.bind(this));

        dispatcher.on('subjects.retrieve', this.onSubjectsRetrieve.bind(this));
        dispatcher.on('subjects.retrieved', this.onSubjectsRetrieved.bind(this));
    }

    setDefaults() {
        this._schedule = [];
        this._teachers = [];
        this._groups = [];
        this._subjects = [];

        this._group = null;
        this._teacher = null;
    }

    get schedule() {
        return this._schedule;
    }

    get teachers() {
        return this._teachers;
    }

    get groups() {
        return this._groups;
    }

    get subjects() {
        return this._subjects;
    }

    get group() {
        return this._group;
    }

    get teacher() {
        return this._teacher;
    }

    onScheduleRetrieved(payload) {
        this._schedule = payload.data;
        this.trigger('changed');
    }

    onTeachersRetrieve() {
        return userActions.getTeachers();
    }

    onGroupsRetrieve() {
        return groupActions.getGroups();
    }

    onSubjectsRetrieve() {
        return subjectActions.getSubjects();
    }

    onGroupsRetrieved(payload) {
        this._groups = payload.data;
        this.trigger('changed');
    }

    onScheduleRetrieve(payload) {
        this._teacher = payload.data.teacher; // filter by teacher
        this._group = payload.data.group; //filter by group;

        return scheduleActions.getSchedule(payload.data);
    }

    onTeachersRetrieved(payload) {
        this._teachers = payload.data;
        this.trigger('changed');
    }

    onSubjectsRetrieved(payload) {
        this._subjects = payload.data;
        this.trigger('changed');
    }

    onScheduleCreate(payload) {
        return scheduleActions.save(payload.data);
    }

    onScheduleCreated(payload) {
        this._schedule.push(payload.data);
        this.trigger('changed');
    }
}