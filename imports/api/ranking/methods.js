import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rankUsers as calculateRanks } from './calculate-points/scoringAlgorithm';

import Games from '../games/collection';
import VotingSubmissions from '../votingSubmissions/collection';
import Submissions from '../submissions/collection';

/* eslint-disable import/prefer-default-export */
export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
    if (this.isSimulation) return;

    const usersCursor = Meteor.users.find({ role: { $ne: 'admin' } }, { fields: { _id: 1 } });
    const users = usersCursor.fetch();
    if (!users.length) return;
    const submissions = Submissions
      .find({}, { fields: { userId: 1, gameId: 1, guess: 1, rank: 1 } })
      .fetch();

    const games = Games
      .find({}, { fields: { answer: 1, votingId: 1 } })
      .fetch()
      .map(game => (
        game.votingId
          ? { ...game, answer: getPercentageForVoting(game.votingId, VotingSubmissions) }
          : game
      ));

    const ranks = calculateRanks(users, games, submissions);
    const bulk = Meteor.users.rawCollection().initializeUnorderedBulkOp();
    ranks.forEach(({ userId, rank, points }) => {
      bulk.find({ _id: userId }).updateOne({ $set: { rank, points } });
    });
    bulk.execute();
  },
});

function getPercentageForVoting(votingId, VotingSubmissionsCursor) {
  const votingSubmissions = VotingSubmissionsCursor
    .find({ votingId }, { fields: { vote: 1 } })
    .fetch() || [];
  const totalVotesCount = votingSubmissions.length;
  const yesVotesCount = votingSubmissions
    .filter(s => s.vote === 'Ja')
    .length;

  const percentage = (yesVotesCount / totalVotesCount) * 100;

  return Math.round(percentage);
}

// TODO:
// Find out what actually is making performance bad:
// - Meteor sending out publications to subscribers (e.g. when rank changes)
// - Mongo write
// - Calculating ranks
//
