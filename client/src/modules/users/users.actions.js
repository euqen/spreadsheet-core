'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export default class UserListActions {
    static getUsers(data) {
        return api.get('api/v1/user', data)
            .then(res => {
                return res;
            });
    }

    static removeUser(id) {
        return api.put(`api/v1/user/${id}/remove`)
            .then(res => {
                if (!res.hasErrors) {
                    dispatcher.dispatch({action: 'user.removed', data: res});
                }
            })
    }

    static getTeachers() {
        return api.get('api/v1/user', {role: 'teacher'});
    }
}