import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Accounts.registerLoginHandler(({ firstName, lastName }) => {
  check(firstName, String);
  check(lastName, String);

  if (Meteor.userId()) {
    return {
      error: new Meteor.Error(403, 'Already logged in.'),
    };
  }

  const userId = Meteor.users.insert({
    firstName,
    lastName,
  });

  return { userId };
});
