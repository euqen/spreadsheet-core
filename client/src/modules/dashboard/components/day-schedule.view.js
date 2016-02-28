import React from 'react';

export default class DaySchedule extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.title}</h3>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Time</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Auditory</th>
                                    <th>Teacher</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry the Bird</td>
                                    <td>@twitter</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Steve</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <td>Urkel</td>
                                    <td>@steve</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}