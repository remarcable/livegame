import { Meteor } from 'meteor/meteor';

import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
      <Button
        label="Anmelden"
        secondary
        labelStyle={{ color: '#fff' }}
        type="submit"
        style={{ marginTop: 18 }}
      />
    </form>
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
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default AdminLoginPage;
