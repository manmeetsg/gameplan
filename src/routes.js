import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Welcome from './components/welcome';

import Login from './components/login';

import Groups from './components/groups';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="login" component={Login} />
    <Route path="groups" component={Groups} />
  </Route>
);
