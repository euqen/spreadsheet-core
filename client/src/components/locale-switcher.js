import React from 'react';
import counterpart from 'counterpart';

export default class LocaleSwitcher extends React.Component {
    constructor(){
        super();

        this.state = {
            locale: counterpart.getLocale()
        };
    }

    handleChange(locale) {
        console.log(locale);
        counterpart.setLocale(locale);
        this.setState({locale: locale});
    }


    render() {
        return (
             // <select class="selectpicker" defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
             //        <option>en</option>
             //        <option>ru</option>
             // </select>
             <li className="dropdown">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#" aria-expanded="false">{this.state.locale}<span className="caret"></span></a>
                <ul role="menu" className="dropdown-menu pro-menu fadeInUp animated">
                    <li>
                        <a href="#" onClick={this.handleChange.bind(this, "en")} aria-value="en">en</a>
                    </li>
                    <li>
                        <a href="#" onClick={this.handleChange.bind(this, "ru")} aria-value="ru">ru</a>
                    </li>
                </ul>
            </li>
        );
    }
}