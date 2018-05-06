import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import './collections';
import './methods';

Accounts.config({
  forbidClientAccountCreation: true,
});

Meteor.userIsAdmin = function userIsAdmin(id = Meteor.userId()) {
  const userId = Meteor.isServer ? id : Meteor.userId();
  if (!userId) {
    return false;
  }
  const user = Meteor.users.findOne(userId) || {};
  return user.role === 'admin';
};

Meteor.ensureUserIsAdmin = function ensureUserIsAdmin(id) {
  if (!Meteor.userIsAdmin(id)) {
    throw new Meteor.Error('users.unauthorized');
  }
};
