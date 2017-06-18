import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rankUsers } from 'calculate-ranks';

import Games from '../games/collection';
import Submissions from '../submissions/collection';


export const calculateScores = new ValidatedMethod({
  name: 'ranking.calculateScore',
  validate: null,
  run() {
    // TODO: Add proper authentication
    if (this.isSimulation) return;
    const users = Meteor.users.find().fetch().map(user => Object.assign(user, { userId: user._id }));
    const submissions = Submissions.find().fetch();
    const games = Games.find().fetch();
    const ranks = rankUsers(users, games, submissions);

    const bulk = Meteor.users.rawCollection().initializeUnorderedBulkOp();
    ranks.forEach(({ userId, rank }) => {
      bulk.find({ _id: userId }).update({ $set: { rank } });
    });
    bulk.execute();
  },
});
