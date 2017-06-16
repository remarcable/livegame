import React from 'react';
import { spacing } from 'material-ui/styles';

const style = {
  width: '100%',
  paddingTop: spacing.desktopGutterMini,
  paddingBottom: spacing.desktopGutterMini,
  textAlign: 'center',
  fontWeight: 300,
};

const App = () => (
  <span style={style}>
    © { (new Date()).getFullYear() } Marc Nitzsche
  </span>
);

export default App;
