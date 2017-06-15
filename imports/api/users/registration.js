import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.loginWithName = (firstName, lastName, callback) => {
  const loginRequest = {
    firstName,
    lastName,
  };

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback,
  });
};
