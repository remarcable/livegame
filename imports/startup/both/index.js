import { Meteor } from 'meteor/meteor';

import './collections';
import './methods';

Meteor.userIsAdmin = function userIsAdmin(id) {
  const userId = Meteor.isServer ? id : Meteor.userId();
  const user = Meteor.users.findOne(userId) || {};
  return user.role === 'admin';
};

Meteor.ensureUserIsAdmin = function ensureUserIsAdmin() {
  if (!Meteor.userIsAdmin()) {
    throw new Meteor.Error('not-authorized');
  }
};
