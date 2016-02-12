import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/about">About</Link>
                    <Link to="/user">User</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}