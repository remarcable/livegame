import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import AppState from './collection';
import { rankDisplayModes } from './rank-display-modes';

export const showScoresOnLiveView = new ValidatedMethod({
  name: 'app.showScoresOnLiveView',
  validate: null,
  run() {
    Meteor.ensureUserIsAdmin(this.userId);
    AppState.update({}, { $unset: { votingToShow: 1 } });
  },
});

export const showVotingOnLiveView = new ValidatedMethod({
  name: 'app.showVotingOnLiveView',
  validate: new SimpleSchema({
    votingId: { type: String },
  }).validator(),
  run({ votingId }) {
    Meteor.ensureUserIsAdmin(this.userId);
    AppState.update({}, { $set: { votingToShow: votingId } });
  },
});

export const setHintText = new ValidatedMethod({
  name: 'app.setHintText',
  validate: new SimpleSchema({
    hintText: { type: String },
  }).validator(),
  run({ hintText }) {
    Meteor.ensureUserIsAdmin(this.userId);
    AppState.update({}, { $set: { hintText } });
  },
});

export const showRanksUpTo = new ValidatedMethod({
  name: 'app.showRanksUpTo',
  validate: new SimpleSchema({
    mode: { type: String, allowedValues: rankDisplayModes },
  }).validator(),
  run({ mode }) {
    Meteor.ensureUserIsAdmin(this.userId);
    AppState.update(
      {},
      {
        $set: { rankDisplayMode: mode },
      },
    );
  },
});
