'use strict';

import { browserHistory } from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as actions from './../users/users.actions';
import * as notifications from './../../infrastructure/notifications';

export default class ProfileStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('user.update', this.onUserUpdate.bind(this));
        dispatcher.on('user.updated', this.onUserUpdated.bind(this));
    }

    setDefaults() {
        this._user = [];
    }

    get user() {
        return this._user;
    }

    onUserUpdate(payload) {
        return actions.updateUser(payload.userId, payload.user);
    }

    onUserUpdated(payload) {
         notifications.success('User successfully updated', {timeout: 10000});
    }

}