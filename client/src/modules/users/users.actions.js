'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export default class UserListActions {
    static getUsers(data) {
        return api.get('api/v1/user', data)
            .then(res => res.body);
    }

    static removeUser(id) {
        return api.put(`api/v1/user/${id}/remove`)
            .then(res => {
                if (!res.hasErrors) {
                    console.log(dispatcher);
                    dispatcher.dispatch({action: 'user.removed', data: res});
                }
            })
    }
}