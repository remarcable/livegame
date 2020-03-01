import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import AppState from '/imports/api/appState/collection';
import generateInteractionDocsFromData from '/imports/api/interactions/generateInteractionDocsFromData';
import { createInteraction } from '/imports/api/interactions/methods';
import Menu from '/imports/api/menu/collection';
import menuFixtures from '/imports/api/menu/fixtures';
import { insertCandidate, setCandidate } from '/imports/api/candidates/methods';

import { schema } from './schema';

export const createAdminUser = new ValidatedMethod({
  name: 'onboarding.createAdmin',
  validate: schema.validator(),
  run(data) {
    const hasAdmin = !!Meteor.users.findOne({ role: 'admin' });
    const hasAppState = !!AppState.findOne();
    if (hasAdmin || hasAppState) {
      throw new Meteor.Error(
        'Onboarding is not allowed because either appState or admin user already exists',
      );
    }

    const adminUserData = data['0'];
    const { username, password } = adminUserData;
    const userId = Accounts.createUser({
      username,
      password,
    });

    return Meteor.users.update(userId, { $set: { role: 'admin' } });
  },
});

export const insertInitialItems = new ValidatedMethod({
  name: 'onboarding.insert',
  mixins: [userIsAdminMixin],
  validate: schema.validator(),
  run(data) {
    const fullShowGameData = data['1'];
    const estimationGameData = data['2'];

    const interactions = generateInteractionDocsFromData(fullShowGameData, estimationGameData);
    interactions.forEach((interaction) => {
      createInteraction.call(interaction);
    });

    AppState.insert({
      interactionToShow: null,
      rankDisplayMode: 'ALL',
    });

    menuFixtures.forEach((menuItem) => {
      Menu.insert(menuItem);
    });
  },
});
