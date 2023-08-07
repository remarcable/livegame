import { Meteor } from 'meteor/meteor';

import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Logo from '/imports/ui/components/Logo';
import Headline from '/imports/ui/components/Headline';
import DocumentTitle from '/imports/ui/components/DocumentTitle';

const AdminLoginPage = () => (
  <div style={wrapperStyles}>
    <DocumentTitle>Admin-Login</DocumentTitle>
    <Paper style={paperStyles}>
      <Logo />
      <Headline style={{ fontSize: 24, marginTop: 32, marginBottom: 32 }}>Adminbereich</Headline>
      {Meteor.userId() && !Meteor.userIsAdmin() && <LoggedInAsAdminNotice />}
      <form style={styles} onSubmit={handleOnSubmit}>
        <TextField
          label="Benutzername"
          name="username"
          autoComplete="username"
          fullWidth
          required
        />
        <TextField
          label="Passwort"
          name="password"
          type="password"
          autoComplete="current-password"
          fullWidth
          required
          style={{ marginTop: 12 }}
        />
        <Button type="submit" style={{ marginTop: 24 }}>
          Anmelden
        </Button>
      </form>
    </Paper>
  </div>
);

const LoggedInAsAdminNotice = () => (
  <span style={{ color: '#ddd' }}>Sie sind angemeldet, aber nicht als Admin.</span>
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
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const paperStyles = {
  width: 300,
  padding: 32,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default AdminLoginPage;
