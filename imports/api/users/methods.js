import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { userIsLoggedInMixin } from '/imports/api/helpers/validatedMethodMixins';

export const setUserFlag = new ValidatedMethod({
  name: 'users.setFlag',
  mixins: [userIsLoggedInMixin],
  validate: new SimpleSchema({
    flag: String,
  }).validator(),
  run({ flag }) {
    Meteor.users.update(this.userId, { $set: { [`flags.${flag}`]: true } });
  },
});
