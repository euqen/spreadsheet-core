import React from 'react';
import actions from './../../schedule/schedule.actions';

export default class DaySchedule extends React.Component {
    constructor() {
        super();

        this.state = {
            showAddForm: false
        };
    }

    toggleAddForm() {
        this.setState({showAddForm: !this.state.showAddForm});
    }

    save() {
        const model = {
            day: this.props.day.value,
            time: this.state.time,
            teacher: this.state.teacher,
            title: this.state.title,
            type: this.state.type,
            auditory: this.state.auditory
        };

        return actions.save(model);
    }

    componentWillReceiveProps(props) {
        this.setState({teachers: props.teachers});

        if (props.schedule) {
            this.onScheduleReceived(props.schedule);
        }
    }

    onScheduleReceived(schedule) {
        const data = schedule.filter(s => {
           return s.day === this.props.day.value;
        });

        this.setState({schedule: data});
    }

    onTeacherChanged(event) {
        this.setState({teacher: event.target.value});
    }

    onTitleChanged(event) {
        this.setState({title: event.target.value});
    }

    onTypeChanged(event) {
        this.setState({type: event.target.value});
    }

    onTimeChanged(event) {
        this.setState({time: event.target.value});
    }

    onAuditoryChanged(event) {
        this.setState({auditory: event.target.value});
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.title || this.props.day.name}</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            {this.state.schedule ?
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Time</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Auditory</th>
                                    <th>Teacher</th>
                                    <th >Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.state.schedule.map((s, i) => {
                                        return <tr key={s._id}>
                                            <td>{i + 1}</td>
                                            <td>{s.time}</td>
                                            <td>{s.title}</td>
                                            <td>{s.type}</td>
                                            <td>{s.auditory}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    })}
                                {this.state.showAddForm ?
                                <tr>
                                    <td colSpan="2">
                                        <input className="form-control" type="text" placeholder="Time" onChange={this.onTimeChanged.bind(this)} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Title" onChange={this.onTitleChanged.bind(this)} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Type" onChange={this.onTypeChanged.bind(this)} />
                                    </td>
                                    <td>
                                        <input className="form-control" type="text" placeholder="Auditory" onChange={this.onAuditoryChanged.bind(this)} />
                                    </td>
                                    <td>
                                        <select className="form-control" onChange={this.onTeacherChanged.bind(this)}>
                                            {this.state.teachers.map((teacher) => {
                                                return <option key={teacher._id} value={teacher._id}>
                                                    {`${teacher.firstName} ${teacher.lastName}`}
                                                </option>
                                            })}
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn btn-xs btn-primary" onClick={this.save.bind(this)}>
                                            <i className="ion-checkmark-round"></i>
                                        </button>
                                        <button className="btn btn-xs btn-primary" onClick={this.toggleAddForm.bind(this)}>
                                            <i className="ion-close"></i>
                                        </button>
                                    </td>
                                </tr> : null }
                                </tbody>
                            </table> : null}
                            {!this.state.showAddForm && !this.props.hideAddForm ?
                                <button className="btn btn-sm btn-block btn-default" onClick={this.toggleAddForm.bind(this)}>
                                    Add new training activity
                                </button> : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}