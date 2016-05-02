'use strict';

import React from 'react';
import $ from 'jquery';
import 'timepicker';

export default class TimePicker extends React.Component {
    render() {
        return (
            <div className="input-group bootstrap-timepicker timepicker">
                <input id="timepicker"
                       className="form-control"
                       data-provide="timepicker"
                       data-template="modal"
                       data-minute-step="5"
                       data-modal-backdrop="true"
                       data-show-meridian="false"
                       type="text"
                       name="time"
                       onChange={this.props.onChange}
                       placeholder="Time"
                />
            </div>
        );
    }
}