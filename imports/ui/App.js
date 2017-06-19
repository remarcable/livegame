import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Loadable from 'react-loadable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import muiTheme from './components/theme';
import LoadingPage from './Pages/Loading';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <Switch>
        <Route exact path="/admin" component={AdminArea} />
        <Route exact path="/admin/scoreboard" component={Scoreboard} />
        <Route component={LoadableComponent} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default App;

const AdminArea = () => <h1>Hello World!</h1>;
const Scoreboard = () => <h1>Scoreboard</h1>;

const LoadableComponent = Loadable({
  loader: () => import('../ui/Layouts/MainLayout'),
  loading: LoadingPage,
});
