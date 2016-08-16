import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

import Login from './components/login';

import GroupList from './components/grouplist';
import GroupShow from './components/groupshow';

import PostList from './components/postlist';
import PostShow from './components/postshow';

export default(
  <Route path="/" component={App}>
    <IndexRoute />
    <Route path="login" component={Login} />
    <Route path="groups" component={GroupList} />
    <Route path="groups/:id" component={GroupShow} />
    <Route path="posts" component={PostList} />
    <Route path="posts/:id" component={PostShow} />
  </Route>
);
