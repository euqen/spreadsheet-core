'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import { browserHistory } from 'react-router';
import store from 'marcuswestin/store.js';

class LogInStore {
    constructor() {
        this.registerDispatcherEvents()
    }

    registerDispatcherEvents() {
        dispatcher.on('user.logged-in', this.onLoggedIn.bind(this));
    }

    onLoggedIn(payload) {
        if (payload.data.token) {
            store.set('token', payload.data.token);
        }

        browserHistory.push('/dashboard');
    }

}

export default new LogInStore();