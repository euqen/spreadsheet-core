import React from 'react';
import dispatcher from './../../infrastructure/dispatcher';
import bind from './../../infrastructure/store-connector';
import store from './groups.store';
import moment from 'moment';
import {Link} from 'react-router';

function getState(props) {
    return {
        groups: props.groups
    }
}

@bind(store, getState)
export default class GroupsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    componentDidMount() {
        dispatcher.dispatch({action: 'groups.retrieve'});
    }

    componentWillReceiveProps(props) {
        /** Incoming props changing current state and not vice versa **/
        if (props.groups) {
            this.setState({groups: props.groups});
        }
    }

    removeGroup(id) {
        dispatcher.dispatch({action: 'group.remove', id: id});
    }

    render() {
        return (
            <div>
                <div className="portlet">
                    <div className="portlet-heading">
                        <h3 className="portlet-title text-dark text-uppercase">
                            Groups
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
                            <Link to="/groups/new">
                                <i className="ion-android-add"></i>
                            </Link>
                            <span className="divider"></span>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div id="portlet2" className="panel-collapse collapse in">
                        <div className="portlet-body">
                            {this.state.groups.length === 0 ?
                                <div className="alert alert-warning">
                                    There are no groups found, please add one at least.
                                </div> :
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Group Number</th>
                                            <th>Created On</th>
                                            <th>Created By</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.groups.map((group, index) =>
                                                <tr key={group._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{group.groupNumber}</td>
                                                    <td>{moment(group.createdOn).format("DD/MM/YY")}</td>
                                                    <td>{group.createdBy.firstName} {group.createdBy.lastName}</td>
                                                    <td>
                                                        <button className="btn btn-xs btn-icon btn-danger"
                                                                onClick={this.removeGroup.bind(this, [group._id])}>
                                                            <i className="fa fa-remove"></i>
                                                        </button>
                                                        <Link className="btn btn-icon btn-warning btn-xs"
                                                              to={'/groups/' + group._id}>
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