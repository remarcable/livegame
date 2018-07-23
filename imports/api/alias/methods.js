import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

export const setAlias = new ValidatedMethod({
  name: 'users.setAlias',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    userId: { type: String },
    alias: { type: String },
  }).validator(),
  run({ userId, alias }) {
    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error('userId not found');
    Meteor.users.update(userId, {
      $set: { alias },
    });
  },
});

export const unsetAlias = new ValidatedMethod({
  name: 'users.unsetAlias',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    userId: { type: String },
  }).validator(),
  run({ userId }) {
    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error('userId not found');
    Meteor.users.update(userId, {
      $unset: { alias: '' },
    });
  },
});
