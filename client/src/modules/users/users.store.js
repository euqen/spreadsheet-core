'use strict';

import { browserHistory } from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as actions from './users.actions';
import * as notifications from './../../infrastructure/notifications';

class UsersStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('user.remove', this.onUserRemove.bind(this));
        dispatcher.on('user.removed', this.onUserRemoved.bind(this));

        dispatcher.on('users.retrieve', this.onUsersRetrieve.bind(this));
        dispatcher.on('users.retrieved', this.onUsersRetrieved.bind(this));
    }

    setDefaults() {
        this._users = [];
    }

    get users() {
        return this._users;
    }

    onUserRemove(payload) {
        return actions.removeUser(payload.userId);
    }

    onUserRemoved(payload) {
        this._users = this._users.filter(user => user._id !== payload.data._id);
        this.trigger('changed');
        notifications.success('User successfully removed', {timeout: 10000});
    }

    onUsersRetrieve() {
        return actions.getUsers();
    }

    onUsersRetrieved(payload) {
        this._users = payload.data;
        this.trigger('changed');
    }

}

export default new UsersStore();