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

export function getSchedules(data) {
    return api.get('/api/v1/activity/schedules', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'schedules.retrieved', data: res});
            }
        });
}

export function saveActivity(data) {
    return api.post('api/v1/activity/save', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'activity.saved', data: res});
            }
        });
}

export function getActivities(data) {
    return api.get('/api/v1/activity/activities', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'activities.retrieved', data: res});
            }
        });
}
