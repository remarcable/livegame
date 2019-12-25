import { Meteor } from 'meteor/meteor';

import InteractionsCollection from '/imports/api/interactions/collection';
import SubmissionsCollection from '/imports/api/submissions/collection';

import getUserRanks from './getUserRanks';

const UsersCollection = Meteor.users;

const sortingFunc = (a, b) => a._id.localeCompare(b._id);

describe('getUserRanks(interactionsCollection)', () => {
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

  describe.only('aggregation', () => {
    it('returns an array with userIds as _id and a count as correctSubmissions', async () => {
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

      const result = getUserRanks(InteractionsCollection);

      expect(result.sort(sortingFunc)).to.deep.equal(
        [
          { _id: 'U01', correctSubmissions: 2 },
          { _id: 'U02', correctSubmissions: 3 },
          { _id: 'U03', correctSubmissions: 2 },
          { _id: 'U04', correctSubmissions: 0 },
          { _id: 'U05', correctSubmissions: 0 },
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

      const result = getUserRanks(InteractionsCollection);

      expect(result.sort(sortingFunc)).to.deep.equal(
        [
          { _id: 'U02', correctSubmissions: 1 },
          { _id: 'U03', correctSubmissions: 1 },
          { _id: 'U04', correctSubmissions: 0 },
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

      const result = getUserRanks(InteractionsCollection);

      expect(result.sort(sortingFunc)).to.deep.equal(
        [
          { _id: 'U00', correctSubmissions: 0 },
          { _id: 'U01', correctSubmissions: 0 },
        ].sort(sortingFunc),
      );
    });

    it("doesn't count duplicate submissions", async () => {
      const usersToBeInserted = [
        { _id: 'U01' }, // 2 points
        { _id: 'U02' }, // 3 points
      ];

      const interactionsToBeInserted = [
        { _id: 'I01', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'CANDIDATE1' } },
        { _id: 'I02', type: 'FULL_SHOW_GAME', fullShowGame: { winner: 'CANDIDATE2' } },
      ];

      const submissionsToBeInserted = [
        // duplicate submission for I01. Should count as one point each
        { _id: 'S010', userId: 'U01', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S011', userId: 'U01', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S012', userId: 'U01', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S013', userId: 'U01', interactionId: 'I02', value: 'CANDIDATE2' },

        // user 2 selects two different values for I02. Here we don't care which one gets used for ranking
        // (the first one would be preferred though)
        { _id: 'S021', userId: 'U02', interactionId: 'I01', value: 'CANDIDATE1' },
        { _id: 'S022', userId: 'U02', interactionId: 'I01', value: 'CANDIDATE2' },
        { _id: 'S023', userId: 'U02', interactionId: 'I02', value: 'CANDIDATE1' },
        { _id: 'S024', userId: 'U02', interactionId: 'I02', value: 'CANDIDATE1' },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const result = getUserRanks(InteractionsCollection);

      expect(result.sort(sortingFunc)).to.deep.equal(
        // for U02 "correctSubmissions: 4" would be incorrect
        [
          { _id: 'U01', correctSubmissions: 2 },
          { _id: 'U02', correctSubmissions: 1 },
        ].sort(sortingFunc),
      );
    });
  });
});
