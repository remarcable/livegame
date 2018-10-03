import { Meteor } from 'meteor/meteor';
import React from 'react';

const RegistrationForm = () => (
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

const handleOnSubmit = (e) => {
  e.preventDefault();

  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const email = e.target.email.value;

  Meteor.loginWithName({ firstName, lastName, email });
};

export default RegistrationForm;
