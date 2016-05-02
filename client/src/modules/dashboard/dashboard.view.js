'use strict';

import React from 'react';
import SideBar from './../../components/sidebar';
import Header from './../../components/header';
import DaySchedule from './../schedule/components/day-schedule.view';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import bind from './../../infrastructure/store-connector';
import store from './../../modules/users/users.store';

counterpart.registerTranslations('en', {
    titleTodaySchedule: "Today Schedule",
    titleTomorrowSchedule: "Tomorrow Schedule"
});

counterpart.registerTranslations('ru', {
    titleTodaySchedule: "Расписание на сегодня",
    titleTomorrowSchedule: "Расписание на завтра"
});


function getState(props) {
    return {
        user: props.user
    }
}

@bind(store, getState)
export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <SideBar />
                <section className="content">
                    <Header user={this.props.user} />
                        <div className="wrapper container-fluid m-t-20">
                            {this.props.children ? this.props.children :
                                <div>
                                    <DaySchedule
                                        title=<Translate content="titleTodaySchedule" />
                                        hideAddForm={true}
                                        schedule={[]}
                                    />
                                    <DaySchedule
                                        title=<Translate content="titleTomorrowSchedule" />
                                        hideAddForm={true}
                                        schedule={[]}
                                    />
                                </div>}
                        </div>
                </section>
            </div>
        );
    }
}

Dashboard.contextTypes = {
    user: React.PropTypes.object
};