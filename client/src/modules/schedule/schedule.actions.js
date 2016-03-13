'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export default class ScheduleActions {
    static save(data) {
        return api.post('api/v1/schedule/save', data)
            .then(res => {
                if (!res.hasErrors) {
                    dispatcher.dispatch({action: 'schedule.saved', data: res});
                }
            });
    }

    static getSchedule(data) {
        return api.get('api/v1/schedule', data);
    }
}