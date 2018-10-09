import { Meteor } from 'meteor/meteor';

import InteractionsCollection from '/imports/api/interactions/collection';
import SubmissionsCollection from '/imports/api/submissions/collection';

import { aggregateUsersAndInteractionsAndSubmissions } from './aggregateUsersWithSubmissions';

const UsersCollection = Meteor.users;

describe('aggregateUsersWithSubmissions(userCollection)', () => {
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

  describe('users', () => {
    it('returns an array of objects with a userId', async () => {
      const usersToBeInserted = [
        { _id: '01', dataToBeRemoved: 1 },
        { _id: '02', dataToBeRemoved: 2 },
        { _id: '03', dataToBeRemoved: 3 },
        { _id: '04', dataToBeRemoved: 4 },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { users = [] } = result;

      const expected = usersToBeInserted.map(({ _id }) => ({ _id }));
      expect(users).to.deep.equal(expected);
    });

    it('returns an empty array when no users exist', () => {
      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { users = [] } = result;
      const expected = [];

      expect(users).to.deep.equal(expected);
    });

    it('does not return an admin user', async () => {
      const usersToBeInserted = [
        { _id: '01', role: 'admin' },
        { _id: '02' },
        { _id: '03' },
        { _id: '04' },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { users = [] } = result;
      const expected = usersToBeInserted.filter((u) => u.role !== 'admin');

      expect(users).to.deep.equal(expected);
    });
  });

  describe('interactions', () => {
    it('returns an array of objects containing an interactionId and an answer if at least one user exists', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { answer: 200 } },
        { _id: '02', type: 'ESTIMATION_GAME', estimationGame: { answer: 150 } },
        { _id: '03', type: 'ESTIMATION_GAME', estimationGame: { votingId: 'myVotingId' } },
        { _id: '04', type: 'ESTIMATION_GAME', estimationGame: { answer: 50 } },
      ];

      const submissionsToBeInserted = [
        { _id: 'mySubmission', interactionId: 'myVotingId', userId: '01', value: 'YES' },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { interactions = [] } = result;

      const expected = [
        { _id: '01', answer: 200 },
        { _id: '02', answer: 150 },
        { _id: '03', answer: 100 }, // calculated
        { _id: '04', answer: 50 },
      ];

      expect(interactions).to.deep.equal(expected);
    });

    it('returns an empty array when no interactions exist', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      await UsersCollection.rawCollection().insertMany(usersToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { interactions = [] } = result;

      const expected = [];

      expect(interactions).to.deep.equal(expected);
    });

    it('with answer: returns answer', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { answer: 200 } },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { interactions = [] } = result;

      const expected = [{ _id: '01', answer: 200 }];

      expect(interactions).to.deep.equal(expected);
    });

    it('with votingId: returns calculated percentage of YES submissions as answer', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { votingId: 'myVotingId' } },
      ];

      const submissionsToBeInserted = [
        { _id: 'mySubmission1', interactionId: 'myVotingId', userId: '01', value: 'YES' },
        { _id: 'mySubmission2', interactionId: 'myVotingId', userId: '02', value: 'YES' },
        { _id: 'mySubmission3', interactionId: 'myVotingId', userId: '03', value: 'YES' },
        { _id: 'mySubmission4', interactionId: 'myVotingId', userId: '04', value: 'NO' },
        { _id: 'mySubmission5', interactionId: 'myVotingId', userId: '05', value: 'NO' },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { interactions = [] } = result;

      const expected = [{ _id: '01', answer: 60 }];

      expect(interactions).to.deep.equal(expected);
    });

    it('with votingId: returns null as answer when no submission for this voting exists', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { votingId: 'myVotingId' } },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { interactions = [] } = result;

      const expected = [{ _id: '01', answer: null }];

      expect(interactions).to.deep.equal(expected);
    });
  });

  describe('submissions', () => {
    it('returns an array of objects with the userId, interactionId and a value', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { answer: 12 } },
      ];

      const submissionsToBeInserted = [
        { _id: 'mySubmission1', interactionId: '01', userId: '01', value: 101 },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { submissions = [] } = result;

      const expected = submissionsToBeInserted;

      expect(submissions).to.deep.equal(expected);
    });

    it('returns only submissions for interactions that are in interactions', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { answer: 12 } },
        { _id: '02', type: 'ESTIMATION_GAME', estimationGame: { answer: 13 } },
      ];

      const submissionsToBeInserted = [
        { _id: 'mySubmission1', interactionId: '01', userId: '01', value: 101 },
        { _id: 'mySubmission2', interactionId: '01', userId: '02', value: 102 },
        { _id: 'mySubmission3', interactionId: '02', userId: '01', value: 103 },
        { _id: 'mySubmission4', interactionId: '02', userId: '02', value: 104 },
        { _id: 'mySubmission5', interactionId: '03', userId: '01', value: 105 }, // should not be included
        { _id: 'mySubmission6', interactionId: '03', userId: '02', value: 106 }, // should not be included
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { submissions = [] } = result;

      const expected = submissionsToBeInserted.filter((s) => s.interactionId !== '03');

      expect(submissions).to.deep.equal(expected);
    });

    it('returns an empty array when no interactions exist', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const submissionsToBeInserted = [
        { _id: 'mySubmission1', interactionId: '01', userId: '01', value: 101 }, // even though it should not be possible to have a submission without an interaction we also test that this is not includes
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await SubmissionsCollection.rawCollection().insertMany(submissionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { submissions = [] } = result;

      const expected = [];

      expect(submissions).to.deep.equal(expected);
    });

    it('returns an empty array when no submissions exist', async () => {
      const usersToBeInserted = [{ _id: '01' }];
      const interactionsToBeInserted = [
        { _id: '01', type: 'ESTIMATION_GAME', estimationGame: { answer: 12 } },
      ];

      await UsersCollection.rawCollection().insertMany(usersToBeInserted);
      await InteractionsCollection.rawCollection().insertMany(interactionsToBeInserted);

      const [result = []] = aggregateUsersAndInteractionsAndSubmissions(UsersCollection);
      const { submissions = [] } = result;

      const expected = [];

      expect(submissions).to.deep.equal(expected);
    });
  });
});
