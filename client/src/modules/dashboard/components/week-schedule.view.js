import React from 'react';
import DaySchedule from './day-schedule.view';
import scheduleDays from './../../../infrastructure/schedule-days';

export default class WeekSchedule extends React.Component {
    render() {
        return (
            <div>
                {scheduleDays.map((day) => {
                    return <DaySchedule
                        day={day}
                        teachers={this.props.teachers}
                        schedule={this.props.schedule}
                        key={day.name}
                    />
                })}
            </div>
        );
    }
}