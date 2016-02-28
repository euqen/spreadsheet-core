import React from 'react';

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
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">English
                                <span className="caret"></span></a>
                            <ul role="menu" className="dropdown-menu">
                                <li><a href="#">Russian</a></li>
                            </ul>
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
                                <li><a href="profile.html"><i className="fa fa-briefcase"></i>Profile</a></li>
                                <li><a href="#"><i className="fa fa-cog"></i> Settings</a></li>
                                <li><a href="#"><i className="fa fa-sign-out"></i> Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}