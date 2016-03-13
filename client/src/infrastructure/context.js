import userActions from './../modules/users/users.actions';
import permissions from './permissions';

export function getContextUser() {
    return userActions.getCurrentUser()
        .then(user => {
            permissions.extend(user);
            return user;
        })
}