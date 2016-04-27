import React from 'react';
import LocalSwitcher from './locale-switcher';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    dropdownMenu: {
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout'
    }
});

counterpart.registerTranslations('ru', {
    dropdownMenu: {
        profile: 'Профиль',
        settings: 'Настройки',
        logout: 'Выход'
    }
});

export default class Header extends React.Component {
    render() {
        return (
            <header className="top-head container-fluid">
                <button type="button" className="navbar-toggle pull-left">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>

                <form role="search" className="navbar-left app-search pull-left hidden-xs">
                    <input type="text" placeholder="Search..." className="form-control"/>
                    <a href=""><i className="fa fa-search"></i></a>
                </form>

                <nav className=" navbar-default" role="navigation">
                    <ul className="nav navbar-nav hidden-xs">
                        <li className="dropdown">
                            <LocalSwitcher />
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right top-menu top-right-menu">
                        <li className="dropdown">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <i className="fa fa-bell-o"></i>
                                <span className="badge badge-sm up bg-pink count">3</span>
                            </a>
                        </li>

                        <li className="dropdown text-center">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <img alt="" src="" className="img-circle profile-img thumb-sm"/>
                                <span className="username">John Deo </span> <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu pro-menu fadeInUp animated" tabIndex="5003">
                                <li>
                                    <a href="profile.html">
                                        <i className="fa fa-briefcase"></i>
                                        <Translate content="dropdownMenu.profile" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-cog"></i>
                                        <Translate content="dropdownMenu.settings" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-sign-out"></i>
                                        <Translate content="dropdownMenu.logout" />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}