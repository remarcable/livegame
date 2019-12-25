import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import { aggregateUsersAndInteractionsAndSubmissions } from './aggregateUsersWithSubmissions';
import { rankUsers as calculateRanks } from './calculate-points/scoringAlgorithm';

export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    if (this.isSimulation) return;
    this.unblock();

    const [result = {}] = aggregateUsersAndInteractionsAndSubmissions(Meteor.users);
    const { users = [], interactions: games = [], submissions = [] } = result;
    const ranks = calculateRanks(users, games, submissions);

    const bulk = Meteor.users.rawCollection().initializeUnorderedBulkOp();
    ranks.forEach(({ userId, rank, points }) => {
      bulk.find({ _id: userId }).updateOne({ $set: { estimationGame: { rank, points } } });
    });
    bulk.execute();

    return true;
  },
});
