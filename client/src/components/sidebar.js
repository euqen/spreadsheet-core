import React from 'react';
import {Link} from 'react-router';

export default class SideBar extends React.Component {
    render() {
        return (
            <aside className="left-panel" tabIndex="5001">
                <div className="logo">
                    <a href="index.html" className="logo-expanded">
                        <i className="ion-social-buffer"></i>
                        <span className="nav-label"> BSUIR SCHEDULE</span>
                    </a>
                </div>
                <nav className="navigation">
                    <ul className="list-unstyled">
                        <li className="active">
                            <Link to="/dashboard">
                                <i className="ion-home"></i>
                                <span className="nav-label">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <i className="ion-person-stalker"></i>
                                <span className="nav-label">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/schedule">
                                <i className="ion-calendar"></i>
                                <span className="nav-label">Schedule</span>
                            </Link>
                        </li>
                        <li>
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