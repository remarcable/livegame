import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import AppState from './collection';

export const showScoresOnLiveView = new ValidatedMethod({
  name: 'app.showScoresOnLiveView',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, { $set: { scoreboard: 'scores' } });
  },
});

export const showVotingOnLiveView = new ValidatedMethod({
  name: 'app.showVotingOnLiveView',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, { $set: { scoreboard: 'voting' } });
  },
});

export const setHintText = new ValidatedMethod({
  name: 'app.setHintText',
  validate: new SimpleSchema({
    hintText: { type: String },
  }).validator(),
  run({ hintText }) {
    // TODO: Add proper authentication
    AppState.update({}, { $set: { hintText } });
  },
});

export const endLiveGame = new ValidatedMethod({
  name: 'app.endLiveGame',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, {
      $set: { gameEnded: true },
    });
  },
});

export const unendLiveGame = new ValidatedMethod({
  name: 'app.unendLiveGame',
  validate: null,
  run() {
    // TODO: Add proper authentication
    AppState.update({}, {
      $set: { gameEnded: false },
    });
  },
});
