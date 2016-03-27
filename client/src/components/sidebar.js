import React from 'react';
import {Link} from 'react-router';

export default class SideBar extends React.Component {
    constructor() {
        super();
        this.getCurrentRouteName = this.getCurrentRouteName.bind(this);
    }

    getCurrentRouteName() {
        return this.context.route[this.context.route.length - 1].name;
    }

    render() {
        const route = this.getCurrentRouteName();
        return (
            <aside className="left-panel" tabIndex="5001">
                <div className="logo">
                    <a href="/dashboard" className="logo-expanded">
                        <img src="/assets/img/logo.png" width="48" height="55"/>
                        <span className="nav-label">
                            <img src="/assets/img/wording.png" height="55" width="182" alt=""/>
                        </span>
                    </a>
                </div>
                <nav className="navigation">
                    <ul className="list-unstyled">
                        <li className={route === 'dashboard' ? 'active' : ''}>
                            <Link to="/dashboard">
                                <i className="ion-home"></i>
                                <span className="nav-label">Dashboard</span>
                            </Link>
                        </li>
                        <li className={route === 'users' ? 'active' : ''}>
                            <Link to="/users">
                                <i className="ion-person-stalker"></i>
                                <span className="nav-label">Users</span>
                            </Link>
                        </li>
                        <li className={route === 'schedule' ? 'active' : ''}>
                            <Link to="/schedule">
                                <i className="ion-calendar"></i>
                                <span className="nav-label">Schedule</span>
                            </Link>
                        </li>
                        <li className={route === 'registration' ? 'active' : ''}>
                            <Link to="/registration">
                                <i className="ion-calendar"></i>
                                <span className="nav-label">Registration space</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        );
    }
}

SideBar.contextTypes = {
    route: React.PropTypes.array
};