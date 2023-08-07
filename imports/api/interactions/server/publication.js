import { Meteor } from 'meteor/meteor';
import { JoinServer } from 'meteor-publish-join';

import Submissions from '/imports/api/submissions/collection';
import AppState from '/imports/api/appState/collection';

import Interactions from '../collection';
import interactionTypes, { interactionTypeNames } from '../types';
import * as interactionStates from '../states';

import getPercentageForVoting from './getPercentageForVoting';

Meteor.publish('interactions.active', function interactionsActivePublication() {
  if (!this.userId) return this.ready();

  // get all interactionTypes and its fields that should be published
  // and create an object from it for the mongo query
  const fieldsToPublish = [...interactionTypes.values()]
    .map((type) => type.getPublishFields())
    .reduce((arr, val) => [...arr, ...val], [])
    .reduce((obj, val) => ({ ...obj, [val]: 1 }), {});

  return Interactions.find(
    {
      $or: [
        { type: interactionTypeNames.FULL_SHOW_GAME },
        { state: { $in: [interactionStates.ACTIVE, interactionStates.CLOSED] } },
      ],
    },
    {
      fields: {
        title: 1,
        state: 1,
        type: 1,

        ...fieldsToPublish,
      },
    },
  );
});

Meteor.publish('interactions.allInteractions', function interactionsAllPublication() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();
  return Interactions.find();
});

Meteor.publish('interactions.scoreboard', function interactionsActivePublication() {
  if (!this.userId || !Meteor.userIsAdmin(this.userId)) return this.ready();

  JoinServer.publish({
    context: this,
    name: 'additionalData',
    interval: 2000,
    isShared: true,
    doJoin() {
      const { interactionToShow: interactionId } = AppState.findOne() || {};

      if (['FULL_SHOW_GAME_RANKING', 'ESTIMATION_GAME_RANKING'].includes(interactionId)) {
        return {};
      }

      const interaction = Interactions.findOne(interactionId) || {};
      const { type } = interaction;

      if (type === interactionTypeNames.ESTIMATION_VOTING) {
        return {
          yesPercentage: getPercentageForVoting({
            votingId: interactionId,
            optionNameOne: 'YES',
            optionNameTwo: 'NO',
            collection: Submissions,
          }),
        };
      }

      if (type === interactionTypeNames.FULL_SHOW_GAME) {
        return {
          candidate1Percentage: getPercentageForVoting({
            votingId: interactionId,
            optionNameOne: 'CANDIDATE1',
            optionNameTwo: 'CANDIDATE2',
            collection: Submissions,
          }),
        };
      }

      return {};
    },
  });

  return Interactions.find();
});

Meteor.publish(
  'participationVotings.selectedParticipants',
  function selectedParticipantsPublication() {
    if (!this.userId || !Meteor.userIsAdmin(this.userId)) {
      return this.ready();
    }

    const interactions = Interactions.find({ type: 'PARTICIPATION_VOTING' }).fetch() ?? [];
    const selectedParticipantIds = interactions
      .map((interaction) => interaction?.participationVoting?.selectedParticipant ?? null)
      .filter((id) => id !== null);
    return Meteor.users.find(
      { _id: { $in: selectedParticipantIds } },
      { fields: { firstName: 1, lastName: 1, email: 1 } },
    );
  },
);

Meteor.publish(
  'participationVotings.allParticipantsForInteraction',
  function allParticipantsPublication(interactionId) {
    if (!this.userId || !Meteor.userIsAdmin(this.userId)) {
      return this.ready();
    }

    if (!interactionId) {
      return this.ready();
    }

    const submissions = Submissions.find({ interactionId, value: 'YES' }).fetch() ?? [];
    const userIds = submissions.map((submission) => submission.userId);

    return Meteor.users.find(
      { _id: { $in: userIds } },
      { fields: { firstName: 1, lastName: 1, email: 1 } },
    );
  },
);
