import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

/* eslint-disable import/prefer-default-export */
export const updateEmail = new ValidatedMethod({
  name: 'users.updateEmail',
  validate: new SimpleSchema({
    email: { type: String, optional: true },
  }).validator(),
  run({ email }) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('users.updateEmail.unauthorized');
    }
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { email } });
  },
});
