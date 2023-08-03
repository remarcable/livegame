import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';

import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import AppState from '/imports/api/appState/collection';
import Menu from '/imports/api/menu/collection';
import menuFixtures from '/imports/api/menu/fixtures';

import { createAdminAccountSchema } from './schema';

export const createAdminUser = new ValidatedMethod({
  name: 'onboarding.createAdmin',
  validate: createAdminAccountSchema.validator(),
  run({ username, password }) {
    const hasAdmin = !!Meteor.users.findOne({ role: 'admin' });
    const hasAppState = !!AppState.findOne();
    if (hasAdmin || hasAppState) {
      throw new Meteor.Error(
        'Onboarding is not allowed because either appState or admin user already exists',
      );
    }

    const userId = Accounts.createUser({
      username,
      password,
    });

    return Meteor.users.update(userId, { $set: { role: 'admin' } });
  },
});

export const seedDatabase = new ValidatedMethod({
  name: 'onboarding.seedDatabase',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({}).validator(),
  run() {
    AppState.insert({
      interactionToShow: null,
      rankDisplayMode: 'ALL',
    });

    menuFixtures.forEach((menuItem) => {
      Menu.insert(menuItem);
    });
  },
});
