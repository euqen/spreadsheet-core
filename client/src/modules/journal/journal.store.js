'use strict';

import { browserHistory } from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import Store from './../../infrastructure/store';
import * as actions from './journal.actions';
import * as notifications from './../../infrastructure/notifications';

export default class JournalStore extends Store {
    constructor() {
        super();

        this.students = [];
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('students.retrieve', this.onStudentsRetrieve.bind(this));
        dispatcher.on('students.retrieved', this.onStudentsRetrieved.bind(this));

    }

    onStudentsRetrieve(payload) {
        return actions.getStudents(payload.groupId);
    }

    onStudentsRetrieved(payload) {
        this.students = payload.data;
        this.trigger('changed');
    }

}