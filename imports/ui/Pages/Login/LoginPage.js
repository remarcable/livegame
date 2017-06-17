import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const LoginPage = ({ wrapperStyles = {} }) => (
  <div style={{ ...wrapperStyles, ...styles }}>
    <TextField
      floatingLabelText="Vorname"
      fullWidth
    />
    <TextField
      floatingLabelText="Nachname"
      fullWidth
    />
    <RaisedButton
      label="Anmelden"
      secondary
      labelStyle={{ color: '#fff' }}
      style={{ marginTop: theme.spacing.desktopGutter }}
    />
  </div>
);

LoginPage.propTypes = propTypes;

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default LoginPage;
