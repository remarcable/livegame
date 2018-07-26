import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import { rankUsers as calculateRanks } from './calculate-points/scoringAlgorithm';

import Interactions from '../interactions/collection';
import Submissions from '../submissions/collection';

import interactionTypes from '../interactions/types';

/* eslint-disable import/prefer-default-export */
export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    if (this.isSimulation) return;

    this.unblock();

    const users = Meteor.users.find({ role: { $ne: 'admin' } }, { fields: { _id: 1 } }).fetch();
    if (!users.length) return;

    const submissions = Submissions.find(
      {},
      {
        fields: {
          userId: 1,
          interactionId: 1,
          value: 1,
          rank: 1,
        },
      },
    ).fetch();

    const interactions = Interactions.find(
      {
        type: {
          $in: [interactionTypes.ESTIMATION_GAME, interactionTypes.ESTIMATION_VOTING],
        },
      },
      { fields: { estimationGame: 1, type: 1 } },
    ).fetch();

    // TODO: write aggregation for this
    const games = interactions.filter(({ type }) => type === interactionTypes.ESTIMATION_GAME).map(
      ({ _id, estimationGame }) =>
        estimationGame.votingId
          ? {
              _id,
              ...estimationGame,
              answer: getPercentageForVoting(
                submissions.filter(
                  ({ interactionId }) => interactionId === estimationGame.votingId,
                ),
              ),
            }
          : estimationGame,
    );

    const ranks = calculateRanks(users, games, submissions);
    const bulk = Meteor.users.rawCollection().initializeUnorderedBulkOp();
    ranks.forEach(({ userId, rank, points }) => {
      bulk.find({ _id: userId }).updateOne({ $set: { rank, points } });
    });
    bulk.execute();
  },
});

function getPercentageForVoting(submissions) {
  const totalVotesCount = submissions.length;
  const yesVotesCount = submissions.filter((s) => s.value === 'Ja').length;

  const percentage = yesVotesCount / totalVotesCount * 100;

  return Math.round(percentage);
}

// TODO:
// Find out what actually is making performance bad:
// - Meteor sending out publications to subscribers (e.g. when rank changes)
// - Mongo write
// - Calculating ranks
//
