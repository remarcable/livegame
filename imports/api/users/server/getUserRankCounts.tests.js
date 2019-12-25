import { Meteor } from 'meteor/meteor';

import InteractionsCollection from '/imports/api/interactions/collection';
import SubmissionsCollection from '/imports/api/submissions/collection';

import aggregation from './aggregation';
import { transformAggregationResult } from './getUserRankCounts';

const UsersCollection = Meteor.users;

const sortingFunc = (a, b) => a._id.localeCompare(b._id);

describe('getUserRankCounts(interactionsCollection)', () => {
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

  describe('aggregation', () => {
    it('returns an array with points as ids and a count of how many users have that amount', async () => {
      const usersToBeInserted = [
        { _id: 'U01' }, // 2 points
        { _id: 'U02' }, // 3 points
        { _id: 'U03' }, // 2 points
        { _id: 'U04' }, // 0 points
        { _id: 'U05' }, // 0 points
      ];

      const interactionsToBeInserted = [
        { _id: 'I01', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'CANDIDATE1' } },
        { _id: 'I02', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'CANDIDATE2' } },
        { _id: 'I03', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'CANDIDATE1' } },
        { _id: 'I04', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'NONE' } },
      ];

      const submissionsToBeInserted = [
        // user 01 only submitted for first three interactions
        { _id: 'S010', userId: 'U01', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S011', userId: 'U01', interactionId: 'I02', value: 'CANDIDATE1' },
        { _id: 'S012', userId: 'U01', interactionId: 'I03', value: 'CANDIDATE1' },

        { _id: 'S021', userId: 'U02', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S022', userId: 'U02', interactionId: 'I02', value: 'CANDIDATE2' },
        { _id: 'S023', userId: 'U02', interactionId: 'I03', value: 'CANDIDATE1' },
        { _id: 'S024', userId: 'U02', interactionId: 'I04', value: 'CANDIDATE1' },

        // user 03 didn't submit for I02
        { _id: 'S031', userId: 'U03', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S033', userId: 'U03', interactionId: 'I03', value: 'CANDIDATE1' },
        { _id: 'S034', userId: 'U03', interactionId: 'I04', value: 'CANDIDATE1' },

        // user 04 does not have any correct submissions
        { _id: 'S041', userId: 'U04', interactionId: 'I01', value: 'CANDIDATE2' },

        // user 05 does not have any submissions
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = {}] = InteractionsCollection.aggregate(aggregation);

      expect(result.counts.sort(sortingFunc)).to.deep.equal(
        [
          { _id: 0, count: 2 },
          { _id: 2, count: 2 },
          { _id: 3, count: 1 },
        ].sort(sortingFunc),
      );
    });

    it('only counts admin users when they have one or more submissions', async () => {
      const usersToBeInserted = [
        { _id: 'U00', role: 'admin' },
        { _id: 'U01', role: 'admin' },
        { _id: 'U02' },
        { _id: 'U03' },
        { _id: 'U04', role: 'something' },
      ];

      const interactionsToBeInserted = [
        { _id: 'I01', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'CANDIDATE1' } },
      ];

      const submissionsToBeInserted = [
        { _id: 'S010', userId: 'U02', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S011', userId: 'U03', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S012', userId: 'U04', interactionId: 'I01', value: 'CANDIDATE2' },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = {}] = InteractionsCollection.aggregate(aggregation);

      expect(result.counts.sort(sortingFunc)).to.deep.equal(
        [
          { _id: 0, count: 1 },
          { _id: 1, count: 2 },
        ].sort(sortingFunc),
      );
    });

    it('works when there are no submissions', async () => {
      const usersToBeInserted = [{ _id: 'U00' }, { _id: 'U01' }];

      const interactionsToBeInserted = [
        { _id: 'I01', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'NONE' } },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);

      const [result = {}] = InteractionsCollection.aggregate(aggregation);

      expect(result.counts.sort(sortingFunc)).to.deep.equal(
        [{ _id: 0, count: 2 }].sort(sortingFunc),
      );
    });

    it('returns the number of interactions', async () => {
      const usersToBeInserted = [{ _id: 'U00' }, { _id: 'U01' }];

      const interactionsToBeInserted = [
        { _id: 'I01', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'NONE' } },
        { _id: 'I02', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'NONE' } },
        { _id: 'I03', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'NONE' } },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);

      const [result = {}] = InteractionsCollection.aggregate(aggregation);
      expect(result.interactionsCount).to.equal(3);
    });
  });

  describe('transformAggregationResult([{ counts, interactionsCount } = {}] = [])', () => {
    it('returns an array of size interactionsCount + 1', () => {
      const input = [{ interactionsCount: 10, counts: [] }];
      expect(transformAggregationResult(input)).to.have.length(11);
    });

    it('puts the value in elements with id at result[id] and fills the rest with 0', () => {
      const input = [
        {
          interactionsCount: 15,
          counts: [
            { _id: 0, count: 5 },
            { _id: 3, count: 2 },
            { _id: 6, count: 15 },
            { _id: 10, count: 1 },
          ],
        },
      ];
      expect(transformAggregationResult(input)).to.deep.equal([
        5, // has 0 interactions correct
        0, // has 1 interactions correct
        0, // has 2 interactions correct
        2, // ...
        0,
        0,
        15,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
      ]);
    });

    it('returns [0] when interactionsCount is 0 or input is empty array', () => {
      const input1 = [{ interactionsCount: 0, counts: [] }];
      const input2 = [];
      expect(transformAggregationResult(input1)).to.deep.equal([0]);
      expect(transformAggregationResult(input2)).to.deep.equal([0]);
    });
  });
});
