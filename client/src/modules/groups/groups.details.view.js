import React from 'react';
import dispatcher from './../../infrastructure/dispatcher';
import store from './groups.store';
import ErrorCollector from './../../components/error-collector';
import bind from './../../infrastructure/store-connector';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

counterpart.registerTranslations('en', {
    group: "Group",
    create: "Create",
    edit: "Edit",
    groupNumber: "Group Number",
    save: "Save",
    enterGroupNumber: "Enter group number"
});

counterpart.registerTranslations('ru', {
    group: "группу",
    create: "Создать",
    edit: "Изменить",
    groupNumber: "Номер группы",
    save: "Сохранить",
    enterGroupNumber: "Введите номер группы"
});

function getState(props) {
    return {
        group: props.group
    }
}

@bind(store, getState)
export default class GroupDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: {}
        };
    }

    componentDidMount() {
        this.state.isNew = true;
        if (this.props.params.id !== 'new') {
            this.state.isNew = false;
            dispatcher.dispatch({action: 'group.retrieve', id: this.props.params.id});
        }
    }

    onValueChanged(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillReceiveProps(props) {
        /** Incoming props changing current state and not vice versa **/
        if (props.group) {
            this.setState(props.group);
        }
    }

    save() {
        dispatcher.dispatch({action: this.state.isNew ? 'group.create' : 'group.update', group: this.state})
    }

    render() {
        return (
            <div>
                <ErrorCollector />
                <div className="portlet">
                    <div className="portlet-heading">
                        <h3 className="portlet-title text-dark text-uppercase">
                            {this.state.isNew ? <Translate content="create" /> : <Translate content="edit" />} <Translate content="group" />
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
                                <label htmlFor="emial"><Translate content="groupNumber" /></label>
                                <input type="text"
                                       className="form-control"
                                       id="groupNumber"
                                       placeholder="Enter group number"
                                       name="groupNumber"
                                       value={this.state.groupNumber}
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