'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import { browserHistory } from 'react-router';
import store from 'marcuswestin/store.js';
import view from './users.view';

class UsersStore {
    constructor() {
        this.registerDispatcherEvents()
    }

    registerDispatcherEvents() {
        dispatcher.on('user.removed', this.onUserRemoved.bind(this));
    }

    onUserRemoved(payload) {
        // remove user
    }

}

export default new UsersStore();