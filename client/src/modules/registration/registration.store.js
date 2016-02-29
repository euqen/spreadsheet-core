'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import { browserHistory } from 'react-router';
import store from 'marcuswestin/store.js';

class RegistrationStore {
    constructor() {
        this.registerDispatcherEvents()
    }

    registerDispatcherEvents() {
        dispatcher.on('user.created', this.onUserCreated.bind(this));
    }

    onUserCreated(payload) {
        browserHistory.push('/users');
    }

}

export default new RegistrationStore();