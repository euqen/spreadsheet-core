'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export function create(data) {
    return api.post('api/v1/user/create', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'user.created', data: res});
            }
        });
}
