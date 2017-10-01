import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const updateEmail = new ValidatedMethod({
  name: 'users.updateEmail',
  validate: new SimpleSchema({
    email: { type: String, optional: true },
  }).validator(),
  run({ email }) {
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { email } });
  },
});
