import React from 'react';
import counterpart from 'counterpart';

const languages = {
    en: "English",
    ru: "Русский"
};

export default class LocaleSwitcher extends React.Component {
    constructor(){
        super();

        this.state = {
            locale: counterpart.getLocale()
        };
    }

    handleChange(locale) {
        counterpart.setLocale(locale);
        this.setState({locale: locale});
    }

    render() {
        var languageOptions = [];
        for (var key in languages) {
            languageOptions.push(
                <li key={key}>
                    <a href="#" onClick={this.handleChange.bind(this, key)}>{languages[key]}</a>
                </li>
            );
        }
        return (
             <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#" aria-expanded="false">{languages[this.state.locale]}<span className="caret"></span></a>
                <ul role="menu" className="dropdown-menu pro-menu fadeInUp animated">
                    {languageOptions}
                </ul>
            </li>
        );
    }
}