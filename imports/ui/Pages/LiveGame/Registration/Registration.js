import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const Registration = () => (
  <form onSubmit={handleOnSubmit}>
    <input
      type="text"
      placeholder="Vorname"
      name="firstName"
      autoComplete="given-name"
      maxLength="10"
      required
    />
    <input
      type="text"
      placeholder="Nachname"
      name="lastName"
      autoComplete="family-name"
      maxLength="20"
      required
    />
    <input type="email" placeholder="E-Mail" name="email" autoComplete="email" required />
    <input type="submit" value="Anmelden" />
  </form>
);

Registration.propTypes = propTypes;

const handleOnSubmit = (e) => {
  e.preventDefault();

  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const email = e.target.email.value;

  Meteor.loginWithName({ firstName, lastName, email });
};

export default Registration;
