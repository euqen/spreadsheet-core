import React from 'react';

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
                            <a href="index.html"><i className="ion-home"></i> <span className="nav-label">Dashboard</span></a>
                        </li>
                        <li><a href="typography.html"><i className="ion-person-stalker"></i>Students</a></li>
                        <li><a href="buttons.html"><i className="ion-person"></i>Teachers</a></li>
                        <li><a href="icons.html"><i className="ion-calendar"></i>Schedule</a></li>
                    </ul>
                </nav>
            </aside>
        );
    }
}