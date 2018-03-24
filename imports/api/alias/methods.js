import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const setAlias = new ValidatedMethod({
  name: 'users.setAlias',
  validate: new SimpleSchema({
    userId: { type: String },
    alias: { type: String },
  }).validator(),
  run({ userId, alias }) {
    Meteor.ensureUserIsAdmin(this.userId);
    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error('userId not found');
    Meteor.users.update(userId, {
      $set: { alias },
    });
  },
});

export const unsetAlias = new ValidatedMethod({
  name: 'users.unsetAlias',
  validate: new SimpleSchema({
    userId: { type: String },
  }).validator(),
  run({ userId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error('userId not found');
    Meteor.users.update(userId, {
      $unset: { alias: '' },
    });
  },
});
