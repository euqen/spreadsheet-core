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
                            {this.props.children ? this.props.children :
                                <div>
                                    <DaySchedule
                                        title="Today schedule"
                                        hideAddForm={true}
                                    />
                                    <DaySchedule
                                        title="Tomorrow schedule"
                                        hideAddForm={true}
                                    />
                                </div>}
                        </div>
                </section>
            </div>
        );
    }
}