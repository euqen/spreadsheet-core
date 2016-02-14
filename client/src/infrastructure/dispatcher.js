'use strict';

import {Dispatcher} from 'flux';

class dispatcher {

    constructor() {
        this.actions = {};
        this._dispatcher = new Dispatcher();

        this._registerActions();
    }

    _registerActions() {
        this._dispatcher.register((payload) => {
            const action = payload.action;
            if (this.actions[action]) {
                const callback = this.actions[action];
                return callback(payload);
            }
        });
    }

    on(action, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Expected function in on method.')
        }

        this.actions[action] = callback;
    }

    off(action) {
        delete this.actions[action];
    }

    dispatch(source) {
        if (!source.action) {
            throw new Error('Please specify dispatching action');
        }

        this._dispatcher.dispatch(source);
    }

}

export default new dispatcher();

