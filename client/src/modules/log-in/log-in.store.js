'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import { browserHistory } from 'react-router';
import Store from './../../infrastructure/store';
import localStorge from 'marcuswestin/store.js';
import * as actions from './log-in.actions';

export default class LogInStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    setDefaults() {
        this.data = {
            email: null,
            password: null
        };
    }

    registerDispatcherEvents() {
        dispatcher.on('user.logged-in', this.onLoggedIn.bind(this));
        dispatcher.on('user.log-in', this.onLogIn.bind(this));
    }

    onLoggedIn(payload) {
        if (payload.data.token) {
            localStorge.set('token', payload.data.token);
        }

        browserHistory.push('/dashboard');
    }

    onLogIn(payload) {
        return actions.logIn(payload.data);
    }

}