import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import userSchema from '../schema';

Accounts.registerLoginHandler('name', ({ firstName, lastName, email }) => {
  userSchema.validate({ firstName, lastName, email });

  if (Meteor.userId()) {
    return {
      error: new Meteor.Error(403, 'Already logged in.'),
    };
  }

  const userId = Meteor.users.insert({
    firstName,
    lastName,
    email,
  });

  return { userId };
});
