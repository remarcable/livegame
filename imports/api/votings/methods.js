import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Votings from './collection';
import Games from '../games/collection';
import VotingSubmissions from '../votingSubmissions/collection';

export const startVoting = new ValidatedMethod({
  name: 'votings.startVoting',
  validate: new SimpleSchema({
    votingId: { type: String },
  }).validator(),
  run({ votingId }) {
    Meteor.ensureUserIsAdmin(this.userId);

    Votings.update({ state: 'active' }, { $set: { state: 'closed' } });
    Games.update({ state: 'active' }, { $set: { state: 'closed' } });

    Votings.update(votingId, { $set: { state: 'active' } });
  },
});

export const stopVoting = new ValidatedMethod({
  name: 'votings.stopVoting',
  validate: new SimpleSchema({
    votingId: { type: String },
  }).validator(),
  run({ votingId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    Votings.update(votingId, { $set: { state: 'closed' } });
  },
});

export const createVoting = new ValidatedMethod({
  name: 'votings.create',
  validate: new SimpleSchema({
    question: { type: String },
  }).validator(),
  run({ question }) {
    Meteor.ensureUserIsAdmin(this.userId);
    return Votings.insert({ question, yesVotes: 0, noVotes: 0 });
  },
});

export const removeVoting = new ValidatedMethod({
  name: 'votings.remove',
  validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    Meteor.ensureUserIsAdmin(this.userId);
    Games.update({ votingId: id }, { $unset: { votingId: 1 }, $set: { answer: 0 } });
    Votings.remove({ _id: id });
  },
});

export const updateVoting = new ValidatedMethod({
  name: 'votings.update',
  validate: new SimpleSchema({
    id: { type: String },
    question: { type: String },
  }).validator(),
  run({ id, question }) {
    Meteor.ensureUserIsAdmin(this.userId);
    return Votings.update({ _id: id }, { $set: { question } });
  },
});

export const updateVotingCounts = new ValidatedMethod({
  name: 'votings.updateCounts',
  validate: new SimpleSchema({
    votingId: { type: String },
  }).validator(),
  run({ votingId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    const allSubmissionsCount = VotingSubmissions.find({ votingId }).count();
    const yesSubmissionsCount = VotingSubmissions.find({ votingId, vote: 'Ja' }).count();

    Votings.update(votingId, {
      $set: {
        yesVotes: yesSubmissionsCount,
        noVotes: allSubmissionsCount - yesSubmissionsCount,
      },
    });
  },
});
