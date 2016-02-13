import React from 'react';
import {Link} from 'react-router';
import bootstrap from 'bootstrap-material-design';
import $ from 'jquery';

export default class App extends React.Component {
    componentDidMount() {
        $.material.init();
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/about" className="btn btn-primary">About</Link>
                    <Link to="/user" className="btn btn-primary">User</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}