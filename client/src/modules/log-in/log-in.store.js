'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import { browserHistory } from 'react-router';

class LogInStore {
    constructor() {
        this.registerDispatcherEvents()
    }

    registerDispatcherEvents() {
        dispatcher.on('user.logged-in', this.onLoggedIn.bind(this));
    }

    onLoggedIn(payload) {
        browserHistory.push('/dashboard');
    }

}

export default new LogInStore();