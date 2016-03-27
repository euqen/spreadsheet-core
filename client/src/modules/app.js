import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import {getContextUser} from './../infrastructure/context';
import 'bootstrap';
import 'appjs';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        return getContextUser()
            .then((user) => {
                this.setState({user: user});
            });
    }

    getChildContext() {
        return {user: this.state.user, route: this.props.routes};
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

App.childContextTypes = {user: React.PropTypes.object, route: React.PropTypes.array};