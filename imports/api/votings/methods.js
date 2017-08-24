import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Votings from './collection';
import VotingSubmissions from '../votingSubmissions/collection';
import Games from '../games/collection';

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
