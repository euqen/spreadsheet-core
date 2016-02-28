import React from 'react';
import SideBar from './../../components/sidebar';
import Header from './../../components/header';
import DaySchedule from './components/day-schedule.view';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <SideBar />
                <section className="content">
                    <Header />
                    <div className="wrapper container-fluid m-t-20">
                        <DaySchedule title="Today schedule" />
                        <DaySchedule title="Tomorrow schedule" />
                    </div>
                </section>
            </div>
        );
    }
}