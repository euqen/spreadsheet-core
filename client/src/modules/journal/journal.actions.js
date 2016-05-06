'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export function getStudents(data) {
    return api.get('/api/v1/activity/students', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'students.retrieved', data: res});
            }
        });
}
