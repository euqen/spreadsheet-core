import React from 'react';
import actions from './users.actions';
import store from './users.store';

export default class UsersList extends React.Component {
    constructor() {
        super();

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        return actions.getUsers()
            .then(users => {
                this.setState({users: users});
            });
    }

    onUserRemoved(removedUser) {
        const users = this.state.users.filter(user => user._id === removedUser._id);
        this.setState({users: users});
    }

    render() {
        let users = [];
        for (let user of this.state.users) {
            user.id = users.length + 1;
            users.push(<User data={user} key={user._id} />);
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Users</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>E-Mail</th>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {users}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class User extends React.Component {

    removeUser() {
        return actions.removeUser(this.props.data._id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.data.id}</td>
                <td>{this.props.data.email}</td>
                <td>{this.props.data.firstName}</td>
                <td>{this.props.data.middleName}</td>
                <td>{this.props.data.lastName}</td>
                <td>{this.props.data.role}</td>
                <td>
                    <button className="btn btn-danger btn-xs" onClick={this.removeUser.bind(this)}>X</button>
                </td>
            </tr>
        );
    }
}