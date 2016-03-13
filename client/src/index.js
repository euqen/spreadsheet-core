import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route, IndexRoute} from 'react-router'

import App from './modules/app';
import LogIn from './modules/log-in/log-in.view';
import Dashboard from './modules/dashboard/dashboard.view';
import Registration from './modules/registration/registration.view';
import Users from './modules/users/users.view';
import Schedule from './modules/schedule/schedule.view';

const Routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={LogIn}></IndexRoute>
          <Route path="/dashboard" component={Dashboard}>
              <Route path="/registration" component={Registration}></Route>
              <Route path="/users" component={Users}></Route>
              <Route path="/schedule" component={Schedule}></Route>
          </Route>
      </Route>
  </Router>
);

ReactDOM.render(Routes, document.body);