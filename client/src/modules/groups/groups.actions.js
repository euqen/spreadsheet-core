'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export function getGroups(data) {
    return api.get('/api/v1/group', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'groups.retrieved', data: res});
            }
        });
}

export function removeGroup(id) {
    return api.put(`/api/v1/group/${id}/remove`)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'group.removed', data: res});
            }
        });
}

export function createGroup(data) {
    return api.post(`/api/v1/group/create`, data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'group.created', data: res});
            }
        });
}

export function getById(id) {
    return api.get(`/api/v1/group/${id}`)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'group.retrieved', data: res});
            }
        });
}

export function update(id, data) {
    return api.post(`/api/v1/group/${id}/update`, data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'group.updated', data: res});
            }
        });
}