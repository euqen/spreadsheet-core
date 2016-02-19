import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';
import bootstrap from 'bootstrap-material-design';

export default class App extends React.Component {
    componentDidMount() {
        $.material.init();
    }

    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}