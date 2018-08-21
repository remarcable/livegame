import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import userSchema from './schema';

Meteor.loginWithName = ({ firstName, lastName, email }, callback) => {
  const loginRequest = {
    firstName,
    lastName,
    email,
  };

  userSchema.validate(loginRequest);

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback,
  });
};
