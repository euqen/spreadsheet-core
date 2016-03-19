'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as actions from './registration.actions';
import {browserHistory} from 'react-router';

class RegistrationStore extends Store {
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
    }

    get user() {
        return this._user;
    }

    onUserCreate(payload) {
        actions.create(payload.user);
    }

    onUserCreated(payload) {
        this._user = payload.data;
        this.redirect()
    }

    redirect() {
        browserHistory.push('/users');
    }
}

export default new RegistrationStore();