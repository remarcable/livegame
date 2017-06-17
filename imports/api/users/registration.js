import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.loginWithName = (firstName, lastName, callback) => {
  check(firstName, String);
  check(lastName, String);

  const loginRequest = {
    firstName,
    lastName,
  };

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback,
  });
};
