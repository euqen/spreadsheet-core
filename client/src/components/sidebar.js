'use strict';

import React from 'react';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    sections: {
        dashboard: "Dashboard",
        users: "Users",
        schedule: "Schedule",
        registrationSpace: "Registration space",
        groups: "Groups",
        subjects: "Subjects"
    }
});

counterpart.registerTranslations('ru', {
    sections: {
        dashboard: "Личный кабинет",
        users: "Пользователи",
        schedule: "Расписание",
        registrationSpace: "Регистрация",
        groups: "Группы",
        subjects: "Предметы"
    }
});

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
                    <Link to="/dashboard" className="logo-expanded">
                        <img src="/assets/img/logo.png" width="48" height="55"/>
                        <span className="nav-label">
                            <img src="/assets/img/wording.png" height="55" width="182" alt=""/>
                        </span>
                    </Link>
                </div>
                <nav className="navigation">
                    <ul className="list-unstyled">
                        <li className={route === 'dashboard' ? 'active' : ''}>
                            <Link to="/dashboard">
                                <i className="ion-home"></i>
                                <span className="nav-label"><Translate content="sections.dashboard" /></span>
                            </Link>
                        </li>
                        <li className={route === 'users' ? 'active' : ''}>
                            <Link to="/users">
                                <i className="ion-person-stalker"></i>
                                <span className="nav-label"><Translate content="sections.users" /></span>
                            </Link>
                        </li>
                        <li className={route === 'schedule' ? 'active' : ''}>
                            <Link to="/schedule">
                                <i className="ion-calendar"></i>
                                <span className="nav-label"><Translate content="sections.schedule" /></span>
                            </Link>
                        </li>
                        <li className={route === 'registration' ? 'active' : ''}>
                            <Link to="/registration">
                                <i className="ion-person-add"></i>
                                <span className="nav-label"><Translate content="sections.registrationSpace" /></span>
                            </Link>
                        </li>
                        <li className={route === 'groups' ? 'active' : ''}>
                            <Link to="/groups">
                                <i className="ion-person-add"></i>
                                <span className="nav-label"><Translate content="sections.groups" /></span>
                            </Link>
                        </li>
                        <li className={route === 'subjects' ? 'active' : ''}>
                            <Link to="/subjects">
                                <i className="ion-document-text"></i>
                                <span className="nav-label"><Translate content="sections.subjects" /></span>
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