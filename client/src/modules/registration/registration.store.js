'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as actions from './registration.actions';
import * as groupsActions from './../groups/groups.actions';
import {browserHistory} from 'react-router';

export default class RegistrationStore extends Store {
    constructor() {
        super();

        this.registerDispatcherEvents();
        this.setDefaults();
    }

    setDefaults() {
        this._user = {
            role: 'manager'
        };
    }

    registerDispatcherEvents() {
        dispatcher.on('user.create', this.onUserCreate.bind(this));
        dispatcher.on('user.created', this.onUserCreated.bind(this));

        dispatcher.on('groups.retrieve', this.onGroupsRetrieve.bind(this));
        dispatcher.on('groups.retrieved', this.onGroupsRetrieved.bind(this));
    }

    get user() {
        return this._user;
    }

    get groups() {
        return this._groups;
    }

    onUserCreate(payload) {
        return actions.create(payload.user);
    }

    onUserCreated(payload) {
        this._user = payload.data;
        this.redirect()
    }

    onGroupsRetrieve() {
        return groupsActions.getGroups();
    }

    onGroupsRetrieved(payload) {
        this._groups = payload.data;
        this.trigger('changed');
    }

    redirect() {
        browserHistory.goBack();
    }
}