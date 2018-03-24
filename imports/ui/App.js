import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'normalize.css';

import muiTheme from './components/theme';
import MainLayout from './Layouts/MainLayout';
import LoadingPage from './Pages/Loading';

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <Switch>
        <Route exact path="/admin" component={AdminLayoutLoadable} />
        <Route exact path="/admin/users" component={AdminUserListLayoutLoadable} />
        <Route exact path="/admin/liveview" component={LiveViewLayoutLoadable} />
        <Route component={MainLayout} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;

const AdminLayoutLoadable = Loadable({
  loader: () => import('./Layouts/AdminLayout'),
  loading: LoadingPage,
  delay: 200,
});

const AdminUserListLayoutLoadable = Loadable({
  loader: () => import('./Pages/UserList'),
  loading: LoadingPage,
  delay: 200,
});

const LiveViewLayoutLoadable = Loadable({
  loader: () => import('./Layouts/LiveViewLayout'),
  loading: LoadingPage,
  delay: 200,
});
