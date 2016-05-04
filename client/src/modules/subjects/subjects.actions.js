'use strict';

import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';

export function getSubjects(data) {
    return api.get('/api/v1/subject', data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'subjects.retrieved', data: res});
            }
        });
}

export function removeSubject(id) {
    return api.put(`/api/v1/subject/${id}/remove`)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'subject.removed', data: res});
            }
        });
}

export function createSubject(data) {
    return api.post(`/api/v1/subject/create`, data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'subject.created', data: res});
            }
        });
}

export function getById(id) {
    return api.get(`/api/v1/subject/${id}`)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'subject.retrieved', data: res});
            }
        });
}

export function update(id, data) {
    return api.post(`/api/v1/subject/${id}/update`, data)
        .then(res => {
            if (!res.hasErrors) {
                dispatcher.dispatch({action: 'subject.updated', data: res});
            }
        });
}