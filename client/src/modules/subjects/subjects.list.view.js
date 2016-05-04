import React from 'react';
import dispatcher from './../../infrastructure/dispatcher';
import bind from './../../infrastructure/store-connector';
import store from './subjects.store.js';
import moment from 'moment';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    subjects: "Subjects",
    noSubjects: "There are no subjects found, please add one at least",
    subjectName: "Subject Name",
    createdOn: "Created On",
    createdBy: "Created By",
    actions: "Actions"
});

counterpart.registerTranslations('ru', {
    subjects: "Предметы",
    noSubjects: "Не найдено ни одного предмета, добавьте предмет для просмотра",
    subjectName: "Название предмета",
    createdOn: "Дата добавления",
    createdBy: "Кем добавлен",
    actions: "Действия"
});

function getState(props) {
    return {
        subjects: props.subjects
    }
}

@bind(store, getState)
export default class SubjectsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: []
        }
    }

    componentDidMount() {
        dispatcher.dispatch({action: 'subjects.retrieve'});
    }

    componentWillReceiveProps(props) {
        /** Incoming props changing current state and not vice versa **/
        if (props.subjects) {
            this.setState({subjects: props.subjects});
        }
    }

    removeSubject(id) {
        dispatcher.dispatch({action: 'subject.remove', id: id});
    }

    render() {
        return (
            <div>
                <div className="portlet">
                    <div className="portlet-heading">
                        <h3 className="portlet-title text-dark text-uppercase">
                            <Translate content="subjects" />
                        </h3>
                        <div className="portlet-widgets">
                            <a href="javascript:;" data-toggle="reload">
                                <i className="ion-refresh"></i>
                            </a>
                            <span className="divider"></span>
                            <a data-toggle="collapse" data-parent="#accordion1" href="#portlet2">
                                <i className="ion-minus-round"></i>
                            </a>
                            <span className="divider"></span>
                            <Link to="/subjects/new">
                                <i className="ion-android-add"></i>
                            </Link>
                            <span className="divider"></span>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div id="portlet2" className="panel-collapse collapse in">
                        <div className="portlet-body">
                            {this.state.subjects.length === 0 ?
                                <div className="alert alert-warning">
                                    <Translate content="noSubjects" />
                                </div> :
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th><Translate content="subjectName" /></th>
                                            <th><Translate content="createdOn" /></th>
                                            <th><Translate content="createdBy" /></th>
                                            <th><Translate content="actions" /></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.subjects.map((subject, index) =>
                                                <tr key={subject._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{subject.name}</td>
                                                    <td>{moment(subject.createdOn).format("DD/MM/YY")}</td>
                                                    <td>{subject.createdBy.firstName} {subject.createdBy.lastName}</td>
                                                    <td>
                                                        <button className="btn btn-xs btn-icon btn-danger"
                                                                onClick={this.removeSubject.bind(this, [subject._id])}>
                                                            <i className="fa fa-remove"></i>
                                                        </button>
                                                        <Link className="btn btn-icon btn-warning btn-xs"
                                                              to={'/subjects/' + subject._id}>
                                                            <i className="fa fa-wrench"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}