import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import userSchema from './schema';

Meteor.loginWithName = ({ firstName, lastName, email, newsletter }, callback) => {
  const loginRequest = {
    firstName,
    lastName,
    email,
    newsletter,
  };

  try {
    userSchema.validate(loginRequest);
  } catch (e) {
    callback(e);
    return;
  }

  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback,
  });
};
