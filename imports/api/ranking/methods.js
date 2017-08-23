import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import calculateRanks from './calculateRanks';

import Games from '../games/collection';
import Submissions from '../submissions/collection';


export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
    if (this.isSimulation) return;
    const users = Meteor.users.find({ role: { $ne: 'admin' } }).fetch();
    const submissions = Submissions.find().fetch();
    const games = Games.find().fetch();
    const ranks = calculateRanks(users, games, submissions);

    const bulk = Meteor.users.rawCollection().initializeUnorderedBulkOp();
    ranks.forEach(({ userId, rank }) => {
      bulk.find({ _id: userId }).update({ $set: { rank } });
    });
    bulk.execute();
  },
});
