import React from 'react';
import counterpart from 'counterpart';
import dispatcher from './../infrastructure/dispatcher';

const languages = {
    en: "English",
    ru: "Русский"
};

export default class LocaleSwitcher extends React.Component {
    handleChange(locale) {
        this.setLocale(locale);
        this.props.user.locale = locale; //set current locale in case while context does not update yet

        dispatcher.dispatch({action: 'user.change-locale', userId: this.props.user._id, locale: locale});
    }

    setLocale(locale) {
        counterpart.setLocale(locale || "en");
    }

    componentWillReceiveProps(props) {
        this.setLocale(props.user.locale);
    }

    render() {
        let languageOptions = [];
        for (const key in languages) {
            languageOptions.push(
                <li key={key}>
                    <a href="#" onClick={this.handleChange.bind(this, key)}>{languages[key]}</a>
                </li>
            );
        }

        return (
             <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#" aria-expanded="false">{languages[this.props.user.locale]}<span className="caret"></span></a>
                <ul role="menu" className="dropdown-menu pro-menu fadeInUp animated">
                    {languageOptions}
                </ul>
            </li>
        );
    }
}