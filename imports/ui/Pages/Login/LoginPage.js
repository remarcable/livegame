import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { theme } from '../../components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
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
    <div style={{ height: theme.spacing.desktopGutter }} />
    <RaisedButton label="Anmelden" secondary labelStyle={{ color: '#fff' }} />
  </div>
);

LoginPage.propTypes = propTypes;

export default LoginPage;
