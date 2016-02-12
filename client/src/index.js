import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route} from 'react-router'

import App from './components/app';
import About from './components/about';
import User from './components/user';

const Routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
          <Route path="about" component={About}></Route>
          <Route path="user" component={User}></Route>
      </Route>
  </Router>
);

ReactDOM.render(Routes, document.body);