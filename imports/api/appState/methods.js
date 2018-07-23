import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import { userIsAdminMixin } from '/imports/api/helpers/validatedMethodMixins';

import AppState from './collection';
import { rankDisplayModes } from './rank-display-modes';

export const showScoresOnLiveView = new ValidatedMethod({
  name: 'app.showScoresOnLiveView',
  mixins: [userIsAdminMixin],
  validate: null,
  run() {
    AppState.update({}, { $unset: { votingToShow: 1 } });
  },
});

export const showVotingOnLiveView = new ValidatedMethod({
  name: 'app.showVotingOnLiveView',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    votingId: { type: String },
  }).validator(),
  run({ votingId }) {
    AppState.update({}, { $set: { votingToShow: votingId } });
  },
});

export const setHintText = new ValidatedMethod({
  name: 'app.setHintText',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    hintText: { type: String },
  }).validator(),
  run({ hintText }) {
    AppState.update({}, { $set: { hintText } });
  },
});

export const showRanksUpTo = new ValidatedMethod({
  name: 'app.showRanksUpTo',
  mixins: [userIsAdminMixin],
  validate: new SimpleSchema({
    mode: { type: String, allowedValues: rankDisplayModes },
  }).validator(),
  run({ mode }) {
    AppState.update(
      {},
      {
        $set: { rankDisplayMode: mode },
      },
    );
  },
});
