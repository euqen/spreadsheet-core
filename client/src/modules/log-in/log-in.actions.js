'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export function logIn(data) {
    return api.post('api/v1/auth/log-in', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'user.logged-in', data: res});
            }
        });
}