import { Meteor } from 'meteor/meteor';

import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { theme } from '/imports/ui/components/theme';

const AdminLoginPage = () => (
  <div style={wrapperStyles}>
    <h1 style={{ textAlign: 'center' }}>Admin</h1>
    {Meteor.userId() && !Meteor.userIsAdmin() && <LoggedInAsAdminNotice />}
    <form style={styles} onSubmit={handleOnSubmit}>
      <TextField
        floatingLabelText="Benutzername"
        name="username"
        autoComplete="username"
        fullWidth
        required
      />
      <TextField
        floatingLabelText="Passwort"
        name="password"
        type="password"
        autoComplete="current-password"
        fullWidth
        required
      />
      <RaisedButton
        label="Anmelden"
        secondary
        labelStyle={{ color: '#fff' }}
        type="submit"
        style={{ marginTop: theme.spacing.desktopGutter }}
      />
    </form>
  </div>
);

const LoggedInAsAdminNotice = () => (
  <span style={{ color: theme.palette.secondaryTextColor }}>
    Sie sind angemeldet, aber nicht als Admin.
  </span>
);

const handleOnSubmit = (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  Meteor.loginWithPassword(username, password, (err) => {
    if (err) {
      window.alert('Login fehlgeschlagen');
    }
  });
};

const wrapperStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '100%',
};

const styles = {
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default AdminLoginPage;