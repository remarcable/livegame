import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import muiTheme from './components/theme';
import MainLayout from './components/MainLayout';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <MainLayout />
  </MuiThemeProvider>
);

export default App;
