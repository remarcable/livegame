import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import calculateRanks from './calculateRanks';

import Games from '../games/collection';
import VotingSubmissions from '../votingSubmissions/collection';
import Submissions from '../submissions/collection';


export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
    if (this.isSimulation) return;

    const users = Meteor.users.find({ role: { $ne: 'admin' } }).fetch();
    const submissions = Submissions.find().fetch();

    const games = Games
      .find()
      .fetch()
      .map(game => (
        game.votingId
          ? { ...game, answer: getPercentageForVoting(game.votingId, VotingSubmissions) }
          : game
      ));

    const ranks = calculateRanks(users, games, submissions);

    const bulk = Meteor.users.rawCollection().initializeUnorderedBulkOp();
    ranks.forEach(({ userId, rank }) => {
      bulk.find({ _id: userId }).update({ $set: { rank } });
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
