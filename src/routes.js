import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

import Home from './components/home';

import Login from './components/login';

import GroupList from './components/grouplist';
import GroupNew from './components/groupnew';
import GroupShow from './components/groupshow';

import PostList from './components/postlist';
import PostNew from './components/postnew';
import PostShow from './components/postshow';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />

    <Route path="groups" component={GroupList} />
    <Route path="groups/new" component={GroupNew} />
    <Route path="groups/:id" component={GroupShow} />

    <Route path="posts" component={PostList} />
    <Route path="posts/new" component={PostNew} />
    <Route path="posts/:id" component={PostShow} />
  </Route>
);
