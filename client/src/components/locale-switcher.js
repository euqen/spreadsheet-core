import React from 'react';
import counterpart from 'counterpart';

export default class LocaleSwitcher extends React.Component {
    handleChange(e) {
        counterpart.setLocale(e.target.value);
    }
    render() {
        return (
             <select class="selectpicker" defaultValue={counterpart.getLocale()} onChange={this.handleChange}>
                    <option>en</option>
                    <option>ru</option>
             </select>
        );
    }
}