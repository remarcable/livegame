import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import getAlias from './get-alias';

export const setAlias = new ValidatedMethod({
  name: 'users.setAlias',
  validate: new SimpleSchema({
    userId: { type: String },
  }).validator(),
  run({ userId }) {
    // TODO: Add proper authentication
    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error('userId not found');
    const randomAlias = getAlias();
    Meteor.users.update(userId, {
      $set: { alias: randomAlias },
    });
  },
});

export const unsetAlias = new ValidatedMethod({
  name: 'users.unsetAlias',
  validate: new SimpleSchema({
    userId: { type: String },
  }).validator(),
  run({ userId }) {
    // TODO: Add proper authentication
    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error('userId not found');
    Meteor.users.update(userId, {
      $unset: { alias: '' },
    });
  },
});
