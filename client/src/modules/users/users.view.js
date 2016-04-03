import React from 'react';
import dispatcher from './../../infrastructure/dispatcher';
import bind from './../../infrastructure/store-connector';
import store from './users.store';

function getState(props) {
    return {
        users: props.users
    }
}

@bind(store, getState)
export default class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        dispatcher.dispatch({action: 'users.retrieve'});
    }

    componentWillReceiveProps(props) {
        /** Incoming props changing current state and not vice versa **/
        this.setState({users: props.users});
    }

    shouldComponentUpdate(props, state) {
        return state.users.length !== this.state.users.length;
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Registered users</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            {this.state.users.length === 0 ?
                                <div className="alert alert-warning">
                                    There are no users found, please add one at least.
                                </div> :
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
                                    {
                                        this.state.users.map((user, index) =>
                                            <User user={user} number={index} key={user._id}/>)
                                    }
                                    </tbody>
                                </table>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class User extends React.Component {
    removeUser() {
        dispatcher.dispatch({action: 'user.remove', userId: this.props.user._id})
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.middleName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.role}</td>
                <td>
                    <button className="btn btn-danger btn-xs" onClick={this.removeUser.bind(this)}>X</button>
                </td>
            </tr>
        );
    }
}