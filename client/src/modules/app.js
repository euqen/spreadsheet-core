import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import 'bootstrap';
import 'appjs';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}