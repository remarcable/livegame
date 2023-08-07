import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Accounts } from 'meteor/accounts-base';

import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import AppState from '/imports/api/appState/collection';
import Menu from '/imports/api/menu/collection';
import menuFixtures from '/imports/api/menu/fixtures';

import Interactions from '/imports/api/interactions/collection';
import { interactionTypeNames } from '/imports/api/interactions/types';
import generateInteractionDocsFromData from '/imports/api/interactions/generateInteractionDocsFromData';
import { createInteraction } from '/imports/api/interactions/methods';

import {
  createEstimationGamesSchema,
  createShowGamesSchema,
  createAdminAccountSchema,
} from './schema';

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

    return Meteor.users.update(userId, {
      $set: {
        role: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@wer-besiegt-paul.de',
      },
    });
  },
});

export const seedDatabase = new ValidatedMethod({
  name: 'onboarding.seedDatabase',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({}).validator(),
  run() {
    menuFixtures.forEach((menuItem) => {
      Menu.insert(menuItem);
    });

    AppState.insert({
      interactionToShow: null,
      rankDisplayMode: 'ALL',
    });
  },
});

export const bulkInsertInteractions = new ValidatedMethod({
  name: 'onboarding.bulkInsertInteractions',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    fullShowGameData: createShowGamesSchema,
    estimationGameData: createEstimationGamesSchema,
  }).validator(),
  async run({ fullShowGameData, estimationGameData }) {
    if (!fullShowGameData || !estimationGameData) {
      throw new Meteor.Error('Missing data');
    }

    const interactions = generateInteractionDocsFromData(fullShowGameData, estimationGameData);

    await Promise.all(interactions.map((interaction) => createInteraction.callAsync(interaction)));

    // Link estimationVotings with estimationGames
    // This works well for the setup wizard but the questions
    // will have to be updated later to ask for the result,
    // not the same question again
    const estimationVotings = Interactions.find({
      type: interactionTypeNames.ESTIMATION_VOTING,
    }).fetch();
    const estimationGames = Interactions.find({
      type: interactionTypeNames.ESTIMATION_GAME,
      'estimationGame.question': { $in: estimationVotings.map((i) => i.estimationVoting.question) },
    }).fetch();

    estimationGames.forEach((estimationGame) => {
      const estimationVoting = estimationVotings.find(
        (voting) => voting.estimationVoting?.question === estimationGame.estimationGame?.question,
      );

      Interactions.update(
        { _id: estimationGame._id },
        { $set: { 'estimationGame.votingId': estimationVoting._id } },
      );
    });
  },
});
