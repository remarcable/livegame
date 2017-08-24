import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Votings from './collection';
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
