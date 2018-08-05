import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { theme } from '/imports/ui/components/theme';

const propTypes = {
  wrapperStyles: PropTypes.object,
};

const Registration = ({ wrapperStyles = {} }) => (
  <form style={{ ...wrapperStyles, ...styles }} onSubmit={handleOnSubmit}>
    <TextField
      floatingLabelText="Vorname"
      name="firstName"
      autoComplete="given-name"
      maxLength="10"
      fullWidth
      required
    />
    <TextField
      floatingLabelText="Nachname"
      name="lastName"
      autoComplete="family-name"
      maxLength="20"
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
);

Registration.propTypes = propTypes;

const handleOnSubmit = (e) => {
  e.preventDefault();
  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;

  Meteor.loginWithName(firstName, lastName);
};

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default Registration;
