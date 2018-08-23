import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import 'normalize.css';

import LiveGame from './Pages/LiveGame';
import FullPageLoading from './Pages/FullPageLoading';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/admin" component={AdminShowScreenLoadable} />
      <Route exact path="/admin/edit" component={AdminEditScreenLoadable} />
      <Route exact path="/admin/users" component={UserListPageLoadable} />
      <Route exact path="/admin/liveview" component={LiveViewScreenLoadable} />
      <Route component={LiveGame} />
    </Switch>
  </Router>
);

export default App;

const AdminShowScreenLoadable = Loadable({
  loader: () => import('./Pages/Admin/ShowScreen'),
  loading: FullPageLoading,
  delay: 200,
  timeout: 10000,
});

const AdminEditScreenLoadable = Loadable({
  loader: () => import('./Pages/Admin/EditScreen'),
  loading: FullPageLoading,
  delay: 200,
  timeout: 10000,
});

const UserListPageLoadable = Loadable({
  loader: () => import('./Pages/Admin/UserList'),
  loading: FullPageLoading,
  delay: 200,
  timeout: 10000,
});

const LiveViewScreenLoadable = Loadable({
  loader: () => import('./Pages/Admin/LiveView'),
  loading: FullPageLoading,
  delay: 200,
  timeout: 10000,
});
