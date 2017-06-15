import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';

import 'normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <AppBar
      title="WBP Live"
      showMenuIconButton={false}
      titleStyle={{ textAlign: 'center', fontWeight: 300 }}
    />
  </MuiThemeProvider>
);

export default App;
