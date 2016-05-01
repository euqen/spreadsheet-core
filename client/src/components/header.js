import React from 'react';
import LocalSwitcher from './locale-switcher';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import LocalizationService from './../infrastructure/localization-service';
import dispatcher from './../infrastructure/dispatcher';

counterpart.registerTranslations('en', {
    dropdownMenu: {
        profile: 'Profile',
        statistic: 'Statistic',
        logout: 'Logout',
        search: 'Search...'
    }
});

counterpart.registerTranslations('ru', {
    dropdownMenu: {
        profile: 'Профиль',
        statistic: 'Статистика',
        logout: 'Выход',
        seacrh: 'Поиск'
    }
});

const additionalConstants = {
    en: {
        search: "Search..."
    },
    ru: {
        search: "Поиск..."
    }
};

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {};
        
        this.state.localizationService = new LocalizationService(additionalConstants);
    }

    logout() {
        dispatcher.dispatch({action: 'user.logout'});
    }

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
                    <input type="text" placeholder={this.state.localizationService.translate("search")} className="form-control"/>
                    <a href=""><i className="fa fa-search"></i></a>
                </form>

                <nav className=" navbar-default" role="navigation">
                    <ul className="nav navbar-nav hidden-xs">
                            <LocalSwitcher user={this.props.user} />
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
                                <span className="username">{this.props.user.firstName + " " + this.props.user.lastName}</span> <span className="caret"></span>
                            </a>
                            <ul className="dropdown-menu pro-menu fadeInUp animated" tabIndex="5003">
                                <li>
                                    <Link to="/profile" >
                                        <i className="fa fa-briefcase"></i>
                                        <Translate content="dropdownMenu.profile" />
                                    </Link>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-cog"></i>
                                        <Translate content="dropdownMenu.statistic" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.logout.bind(this)}>
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