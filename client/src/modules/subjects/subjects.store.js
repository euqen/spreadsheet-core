'use strict';

import { browserHistory } from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as actions from './subjects.actions.js';
import * as notifications from './../../infrastructure/notifications';

export default class GroupsStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('subject.create', this.onSubjectCreate.bind(this));
        dispatcher.on('subject.created', this.onSubjectCreated.bind(this));

        dispatcher.on('subject.remove', this.onSubjectRemove.bind(this));
        dispatcher.on('subject.removed', this.onSubjectRemoved.bind(this));

        dispatcher.on('subjects.retrieve', this.onSubjectsRetrieve.bind(this));
        dispatcher.on('subjects.retrieved', this.onSubjectsRetrieved.bind(this));

        dispatcher.on('subject.retrieve', this.onSubjectRetrieve.bind(this));
        dispatcher.on('subject.retrieved', this.onSubjectRetrieved.bind(this));

        dispatcher.on('subject.update', this.onSubjectUpdate.bind(this));
        dispatcher.on('subject.updated', this.onSubjectUpdated.bind(this));
    }

    setDefaults() {
        this._subjects = [];
        this._subject = {};
    }

    get subjects() {
        return this._subjects;
    }

    get subject() {
        return this._subject;
    }

    onSubjectCreate(payload) {
        return actions.createSubject(payload.subject);
    }

    onSubjectCreated() {
        this.redirect();
    }

    onSubjectRemove(payload) {
        return actions.removeSubject(payload.id);
    }

    onSubjectRemoved(payload) {
        this._subjects = this._subjects.filter(group => group._id !== payload.data._id);
        this.trigger('changed');
        notifications.success('Subject successfully removed', {timeout: 10000});
    }

    onSubjectsRetrieve() {
        return actions.getSubjects();
    }

    onSubjectRetrieve(payload) {
        return actions.getById(payload.id)
    }

    onSubjectRetrieved(payload) {
        this._subject = payload.data;
        this.trigger('changed');
    }

    onSubjectsRetrieved(payload) {
        this._subjects = payload.data;
        this.trigger('changed');
    }

    onSubjectUpdate(payload) {
        return actions.update(payload.subject._id, payload.subject);
    }

    onSubjectUpdated() {
        this.redirect();
    }

    redirect() {
        browserHistory.goBack();
    }
}