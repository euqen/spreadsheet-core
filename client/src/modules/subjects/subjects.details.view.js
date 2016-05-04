import React from 'react';
import dispatcher from './../../infrastructure/dispatcher';
import store from './subjects.store.js';
import ErrorCollector from './../../components/error-collector';
import bind from './../../infrastructure/store-connector';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    subject: "Subject",
    create: "Create",
    edit: "Edit",
    subjectName: "Subject Name",
    save: "Save",
    enterSubjectName: "Enter subject name"
});

counterpart.registerTranslations('ru', {
    subject: "предмет",
    create: "Создать",
    edit: "Изменить",
    groupNumber: "Название предмета",
    save: "Сохранить",
    enterSubjectName: "Введите название предмета"
});

function getState(props) {
    return {
        subject: props.subject
    }
}

@bind(store, getState)
export default class SubjectDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: {}
        };
    }

    componentDidMount() {
        this.state.isNew = true;
        if (this.props.params.id !== 'new') {
            this.state.isNew = false;
            dispatcher.dispatch({action: 'subject.retrieve', id: this.props.params.id});
        }
    }

    onValueChanged(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillReceiveProps(props) {
        /** Incoming props changing current state and not vice versa **/
        if (props.subject) {
            this.setState(props.subject);
        }
    }

    save() {
        dispatcher.dispatch({action: this.state.isNew ? 'subject.create' : 'subject.update', subject: this.state})
    }

    render() {
        return (
            <div>
                <ErrorCollector />
                <div className="portlet">
                    <div className="portlet-heading">
                        <h3 className="portlet-title text-dark text-uppercase">
                            {this.state.isNew ? <Translate content="create" /> : <Translate content="edit" />} <Translate content="subject" />
                        </h3>
                        <div className="portlet-widgets">
                            <a href="javascript:;" data-toggle="reload"><i className="ion-refresh"></i></a>
                            <span className="divider"></span>
                            <a data-toggle="collapse" data-parent="#accordion1" href="#portlet2"><i className="ion-minus-round"></i></a>
                            <span className="divider"></span>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div id="portlet2" className="panel-collapse collapse in">
                        <div className="portlet-body">
                            <div className="form-group">
                                <label htmlFor="subjectName"><Translate content="subjectName" /></label>
                                <input type="text"
                                       className="form-control"
                                       id="subjectName"
                                       placeholder="Enter subject name"
                                       name="name"
                                       value={this.state.name}
                                       onChange={this.onValueChanged.bind(this)} />
                            </div>
                            <div className="form-group">
                                <button onClick={this.save.bind(this)} type="button" className="btn btn-success pull-right"><Translate content="save" /></button>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}