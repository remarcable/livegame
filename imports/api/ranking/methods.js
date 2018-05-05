import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rankUsers as calculateRanks } from './calculate-points/scoringAlgorithm';

import Interactions from '../interactions/collection';
import Submissions from '../submissions/collection';

import * as interactionTypes from '../interactions/interactionTypes';

/* eslint-disable import/prefer-default-export */
export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
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
          $in: [interactionTypes.GUESSING_GAME, interactionTypes.GUESSING_VOTING],
        },
      },
      { fields: { guessingGame: 1, type: 1 } },
    ).fetch();

    // TODO: write aggregation for this
    const games = interactions.filter(({ type }) => type === interactionTypes.GUESSING_GAME).map(
      ({ _id, guessingGame }) =>
        guessingGame.votingId
          ? {
              _id,
              ...guessingGame,
              answer: getPercentageForVoting(
                submissions.filter(({ interactionId }) => interactionId === guessingGame.votingId),
              ),
            }
          : guessingGame,
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
