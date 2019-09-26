import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import 'normalize.css';

import LiveGame from './Pages/LiveGame';
import FullPageLoading from './Pages/FullPageLoading';

// import AdminRouterLoadable from './Pages/Admin/AdminRouter';

const App = () => (
  <Router>
    <Switch>
      <Route path="/admin" component={AdminRouterLoadable} />
      <Route component={LiveGame} />
    </Switch>
  </Router>
);

export default App;

const AdminRouterLoadable = Loadable({
  loader: () => import('./Pages/Admin/AdminRouter'),
  loading: FullPageLoading,
  delay: 200,
  timeout: 10000,
});
