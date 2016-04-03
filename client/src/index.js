import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

import App from './modules/app';
import LogIn from './modules/log-in/log-in.view';
import Dashboard from './modules/dashboard/dashboard.view';
import Registration from './modules/registration/registration.view';
import Users from './modules/users/users.view';
import Schedule from './modules/schedule/schedule.view';
import GroupsList from './modules/groups/groups.list.view';
import GroupDetails from './modules/groups/groups.details.view';

const Routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={LogIn} />
          <Route path="/dashboard" component={Dashboard} name="dashboard">
              <Route path="/registration" component={Registration} name="registration" />
              <Route path="/users" component={Users} name="users" />
              <Route path="/schedule" component={Schedule} name="schedule" />
              <Route path="/groups" component={GroupsList} name="groups" />
              <Route path="/groups/:id" component={GroupDetails} name="group-create" />
          </Route>
      </Route>
  </Router>
);

ReactDOM.render(Routes, document.body);