'use strict';

import { browserHistory } from 'react-router';
import dispatcher from './../../infrastructure/dispatcher';
import api from './../../infrastructure/web.api';
import Store from './../../infrastructure/store';
import * as actions from './groups.actions';
import * as notifications from './../../infrastructure/notifications';

export default class GroupsStore extends Store {
    constructor() {
        super();

        this.setDefaults();
        this.registerDispatcherEvents();
    }

    registerDispatcherEvents() {
        dispatcher.on('group.create', this.onGroupCreate.bind(this));
        dispatcher.on('group.created', this.onGroupCreated.bind(this));

        dispatcher.on('group.remove', this.onGroupRemove.bind(this));
        dispatcher.on('group.removed', this.onGroupRemoved.bind(this));

        dispatcher.on('groups.retrieve', this.onGroupsRetrieve.bind(this));
        dispatcher.on('groups.retrieved', this.onGroupsRetrieved.bind(this));

        dispatcher.on('group.retrieve', this.onGroupRetrieve.bind(this));
        dispatcher.on('group.retrieved', this.onGroupRetrieved.bind(this));

        dispatcher.on('group.update', this.onGroupUpdate.bind(this));
        dispatcher.on('group.updated', this.onGroupUpdated.bind(this));
    }

    setDefaults() {
        this._groups = [];
        this._group = {};
    }

    get groups() {
        return this._groups;
    }

    get group() {
        return this._group;
    }

    onGroupCreate(payload) {
        return actions.createGroup(payload.group);
    }

    onGroupCreated() {
        this.redirect();
    }

    onGroupRemove(payload) {
        return actions.removeGroup(payload.id);
    }

    onGroupRemoved(payload) {
        this._groups = this._groups.filter(group => group._id !== payload.data._id);
        this.trigger('changed');
        notifications.success('Group successfully removed', {timeout: 10000});
    }

    onGroupsRetrieve() {
        return actions.getGroups();
    }

    onGroupRetrieve(payload) {
        return actions.getById(payload.id)
    }

    onGroupRetrieved(payload) {
        this._group = payload.data;
        this.trigger('changed');
    }

    onGroupsRetrieved(payload) {
        this._groups = payload.data;
        this.trigger('changed');
    }

    onGroupUpdate(payload) {
        return actions.update(payload.group._id, payload.group);
    }

    onGroupUpdated() {
        this.redirect();
    }

    redirect() {
        browserHistory.goBack();
    }
}