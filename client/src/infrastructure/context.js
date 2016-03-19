import * as actions from './../modules/users/users.actions';
import permissions from './permissions';

export function getContextUser() {
    return actions.getCurrentUser()
        .then(user => {
            permissions.extend(user);
            return user;
        })
}