'use strict';

import React from 'react';
import {Link} from 'react-router';
import bind from './../../infrastructure/store-connector';
import dispatcher from './../../infrastructure/dispatcher';
import ErrorCollector from './../../components/error-collector';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import store from './journal.store';

counterpart.registerTranslations('en', {
    journal: "Journal"
});

counterpart.registerTranslations('ru', {
    journal: "Журнал"
});

function getState(props) {
    return {
        user: props.user,
        students: props.students
    }
}

@bind(store, getState)
export default class Journal extends React.Component {
    constructor() {
        super();
        this.state =
        {
            students: {}
        };
        // this.state = this.getInitState();
    }

    componentDidMount() {
        var { groupId, teacherId, subjectId } = this.props.location.query;
        dispatcher.dispatch({action: 'students.retrieve', groupId: groupId});
    }

    componentWillReceiveProps(props) {
        if (props.students) {
            this.setState({students: props.students});
        }
    }

    getStudentFullname (student) {
        return student.lastName + " " + student.firstName + " " + student.middleName;
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <Translate content="journal" />
                        </h3>
                    </div>
                    <div className="panel-body">
                        <ErrorCollector />
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Student name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.students.map((student, index) =>
                                            <tr key={student._id}>
                                                <th>{index + 1}</th>
                                                <th>{this.getStudentFullname(student)}</th>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
