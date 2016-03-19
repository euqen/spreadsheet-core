'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export function save(data) {
    return api.post('api/v1/schedule/save', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'schedule.saved', data: res});
            }
        });
}

export function getSchedule(data) {
    return api.get('api/v1/schedule', data)
        .then(res => {
                if (!res.hasErrors) {
                    dispatcher.dispatch({action: 'schedule.retrieved', data: res});
                }
        });
}