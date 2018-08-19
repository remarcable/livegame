import { Meteor } from 'meteor/meteor';

import InteractionsCollection from '/imports/api/interactions/collection';
import SubmissionsCollection from '/imports/api/submissions/collection';

import { calculateScores } from './methods';

const UsersCollection = Meteor.users;

// polyfill Meteor.userIsAdmin
Meteor.userIsAdmin = () => true;

describe('Meteor method: ranking.calculateScore', () => {
  beforeEach(() => {
    InteractionsCollection.remove({});
    SubmissionsCollection.remove({});
    UsersCollection.remove({});
  });

  afterEach(() => {
    InteractionsCollection.remove({});
    SubmissionsCollection.remove({});
    UsersCollection.remove({});
  });

  it('ranks users when an estimation game was played', (done) => {
    const usersToBeInserted = [{ _id: 'user01' }, { _id: 'user02' }, { _id: 'user03' }];
    const interactionsToBeInserted = [
      { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { answer: 200 } },
    ];

    const submissionsToBeInserted = [
      { _id: 'mySubmission1', interactionId: '01', userId: 'user01', value: 100 },
      { _id: 'mySubmission2', interactionId: '01', userId: 'user02', value: 200 },
    ];

    UsersCollection.rawCollection().insertMany(usersToBeInserted);
    InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
    SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

    calculateScores.call((err, res) => {
      expect(err).to.be.undefined;
      expect(res).to.equal(true);

      const users = UsersCollection.find().fetch();
      const expected = [
        { _id: 'user01', estimationGame: { points: 2, rank: 2 } },
        { _id: 'user02', estimationGame: { points: 1, rank: 1 } },
        { _id: 'user03', estimationGame: { points: 3, rank: 3 } },
      ];

      expect(users).to.deep.equal(expected);

      done();
    });
  });
});
